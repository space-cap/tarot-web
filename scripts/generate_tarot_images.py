import os
import time
from google import genai
from google.genai import types
from PIL import Image
import io

def generate_card(client, card_data, output_path):
    print(f"Generating {card_data['name_en']}...")
    
    prompt = f"Tarot card design for '{card_data['name_en']}' ({card_data['name_ko']}). "
    prompt += f"Keywords: {', '.join(card_data['keywords'])}. "
    prompt += f"Meaning: {card_data['desc']} "
    prompt += "Art style: Mystical, fantasy, high detailed, Rider-Waite Smith inspired, digital art, 8k resolution, vertical aspect ratio."

    try:
        # Use gemini-2.5-flash-image (Nano Banana)
        response = client.models.generate_content(
            model='gemini-2.5-flash-image',
            contents=prompt,
        )
        
        image_saved = False
        if response.parts:
            for part in response.parts:
                if part.inline_data:
                    # Depending on library version, might be part.as_image() or manual decoding
                    # The snippet suggests part.as_image() exists if using the right SDK helpers
                    try:
                        image = part.as_image()
                        image.save(output_path)
                        print(f"Saved to {output_path}")
                        image_saved = True
                        break
                    except AttributeError:
                        # Fallback for raw bytes if .as_image() isn't available
                        if hasattr(part.inline_data, 'data'):
                             img_data = part.inline_data.data
                             image = Image.open(io.BytesIO(img_data))
                             image.save(output_path)
                             print(f"Saved to {output_path}")
                             image_saved = True
                             break
        
        if not image_saved:
            print(f"No image content found for {card_data['name_en']}")

    except Exception as e:
        print(f"Error generating {card_data['name_en']}: {e}")

def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Please set GEMINI_API_KEY environment variable.")
        return

    client = genai.Client(api_key=api_key)
    
    # Path to assets
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "..", "src", "assets", "cards")
    os.makedirs(output_dir, exist_ok=True)

    cards = [
        {
            "id": 19,
            "name_en": "The Sun",
            "name_ko": "태양",
            "filename": "major_19_sun.png",
            "keywords": ["성공", "기쁨", "활력", "긍정"],
            "desc": "모든 것이 밝게 빛나는 시기입니다. 긍정의 힘을 믿으세요."
        },
        {
            "id": 20,
            "name_en": "Judgement",
            "name_ko": "심판",
            "filename": "major_20_judgement.png",
            "keywords": ["부활", "보상", "결단", "소식"],
            "desc": "기다리던 소식이 오거나, 중요한 결정의 순간이 찾아옵니다."
        },
        {
            "id": 21,
            "name_en": "The World",
            "name_ko": "세계",
            "filename": "major_21_world.png",
            "keywords": ["완성", "성취", "통합", "해피엔딩"],
            "desc": "하나의 여정이 성공적으로 마무리되고, 새로운 세상이 열립니다."
        }
    ]

    for card in cards:
        output_path = os.path.join(output_dir, card["filename"])
        if os.path.exists(output_path):
            print(f"Skipping {card['name_en']}, already exists.")
            continue
            
        generate_card(client, card, output_path)
        time.sleep(2) # Avoid rate limits

if __name__ == "__main__":
    main()
