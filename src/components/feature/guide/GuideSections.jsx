import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { tarotData } from '../../../data/tarotData';

// Placeholder images - in a real scenario, these would be the generated assets
// Using card back as placeholder for now
import cardBackImage from '../../../assets/cards/tarot_card_back.png';

const SectionWrapper = ({ children }) => (
    <motion.div
        className="guide-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
    >
        {children}
    </motion.div>
);

const ParallaxHistorySection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yStars1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const yStars2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

    // Timeline Milestones
    const milestones = [
        {
            year: "15th Century",
            title: "Visconti-Sforza & The Origins",
            desc: "15세기 이탈리아의 귀족 사회에서 시작된 'Tionfi(승리)'. 이것은 단순한 카드 게임이었으나, 당시의 예술과 문화를 담아낸 정교한 그림들이 타로의 시초가 되었습니다.",
            imgPlaceholder: "Visconti Style"
        },
        {
            year: "18th Century",
            title: "Tarot de Marseille",
            desc: "프랑스 마르세유에서 정립된 타로의 체계. 신비주의와 결합하며 점술 도구로서의 정체성을 확립하기 시작했습니다. 목판화 스타일의 강렬한 이미지가 특징입니다.",
            imgPlaceholder: "Marseille Style"
        },
        {
            year: "1909",
            title: "Rider-Waite-Smith",
            desc: "아서 에드워드 웨이트와 파멜라 콜먼 스미스에 의해 탄생한 현대 타로의 표준. 마이너 아르카나까지 모두 그림으로 표현되어 누구나 직관적으로 해석할 수 있게 되었습니다.",
            imgPlaceholder: "Rider-Waite Style"
        },
        {
            year: "2026",
            title: "Digital Evolution",
            desc: "그리고 2026년, 인공지능과 결합하여 당신의 운명을 비추는 'MYSTIC TAROT'으로 진화했습니다. 고대의 지혜는 디지털 세계에서 더욱 명확한 답을 제시합니다.",
            imgPlaceholder: "Tarot 2026 App"
        }
    ];

    return (
        <div ref={containerRef} className="history-parallax-container">
            {/* Background Stars Layer */}
            <motion.div style={{ y: yStars1 }} className="parallax-bg-layer layer-1" />
            <motion.div style={{ y: yStars2 }} className="parallax-bg-layer layer-2" />

            <h2 className="section-title text-center">The Journey of Tarot</h2>

            <div className="timeline-container">
                <div className="timeline-line" />

                {milestones.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="timeline-content">
                            <div className="timeline-year">{item.year}</div>
                            <h3 className="timeline-title">{item.title}</h3>
                            <div className="timeline-image-wrapper">
                                {/* Using cardBackImage as placeholder until generation works */}
                                <img src={cardBackImage} alt={item.title} className="timeline-img" />
                            </div>
                            <p className="timeline-desc">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const StructureSection = () => {
    // Example cards for structure (Major: Fool(0), Minor: Ace of Wands(22), Cups(36), Swords(50), Pentacles(64))
    const exampleIds = [0, 22, 36, 50, 64];
    const examples = tarotData.filter(card => exampleIds.includes(card.id));

    return (
        <SectionWrapper>
            <h2 className="section-title">The Structure of the Deck</h2>
            <p className="section-text">
                타로 덱은 총 78장의 카드로 구성되어 있으며,
                크게 **메이저 아르카나(Major Arcana)**와 **마이너 아르카나(Minor Arcana)**로 나뉩니다.
            </p>

            <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>Major Arcana (22 Cards)</h3>
            <p className="section-text">
                0번 '광대(The Fool)'부터 21번 '세계(The World)'까지,
                인생의 중요한 영적 여정과 큰 사건들을 상징합니다.
                바보의 여행(Fool's Journey)이라고도 불리는 이 흐름은
                무지에서 시작하여 깨달음으로 완성되는 과정을 보여줍니다.
            </p>

            <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>Minor Arcana (56 Cards)</h3>
            <p className="section-text">
                일상적인 사건과 감정, 사람들과의 관계를 다룹니다.
                4가지 슈트(Suit)로 나뉘며, 각각 고유한 원소와 의미를 가집니다.
            </p>
            <ul className="section-text" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                <li><strong>Wands (불)</strong>: 열정, 행동, 창조, 의지</li>
                <li><strong>Cups (물)</strong>: 감정, 사랑, 관계, 직관</li>
                <li><strong>Swords (공기)</strong>: 생각, 이성, 갈등, 진실</li>
                <li><strong>Pentacles (흙)</strong>: 물질, 현실, 돈, 안정</li>
            </ul>

            <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>Card Examples</h3>
            <div className="card-example-grid">
                {examples.map(card => (
                    <div key={card.id} className="example-card">
                        <img src={card.image} alt={card.name_en} loading="lazy" />
                        <div className="example-card-name">{card.name_ko}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

const UsageSection = () => (
    <SectionWrapper>
        <h2 className="section-title">How to Read Tarot</h2>
        <p className="section-text">
            타로 리딩은 정해진 미래를 맞추는 예언이 아닙니다.
            현재의 상황을 거울처럼 비추어보고, 더 나은 선택을 할 수 있도록 돕는 지혜의 도구입니다.
        </p>

        <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>1. 질문에 집중하세요 (Focus)</h3>
        <p className="section-text">
            카드를 뽑기 전, 당신의 고민이나 질문을 마음속으로 깊이 생각하세요.
            질문이 구체적일수록 답변도 명확해집니다.
            "내 운명은?"보다는 "이 프로젝트를 성공시키기 위해 내가 주의할 점은?"과 같은 질문이 좋습니다.
        </p>

        <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>2. 우연을 믿으세요 (Trust)</h3>
        <p className="section-text">
            무작위로 뽑힌 카드에는 당신의 무의식이 투영되어 있습니다.
            카드의 이미지를 보며 떠오르는 첫인상과 느낌을 믿으세요.
        </p>

        <h3 style={{ color: '#FFD700', marginTop: '2rem' }}>3. 열린 마음 (Open Mind)</h3>
        <p className="section-text">
            때로는 원치 않는 카드가 나올 수도 있습니다.
            하지만 '나쁜 카드'는 없습니다.
            모든 카드는 우리에게 필요한 조언과 경고를 담고 있습니다.
            결과를 열린 마음으로 받아들이고, 긍정적인 변화의 계기로 삼으세요.
        </p>
    </SectionWrapper>
);

const GuideSections = ({ activeTab }) => {
    switch (activeTab) {
        case 'history': return <ParallaxHistorySection />;
        case 'structure': return <StructureSection />;
        case 'how-to-read': return <UsageSection />;
        default: return null;
    }
};

export default GuideSections;
