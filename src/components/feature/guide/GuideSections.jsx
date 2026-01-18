import React from 'react';
import { motion } from 'framer-motion';
import { tarotData } from '../../../data/tarotData';

// Placeholder images - in a real scenario, these would be the generated assets
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

const ElegantHistorySection = () => {
    // Milestones Data - Expanded Content
    const milestones = [
        {
            year: "15th Century",
            title: "Visconti-Sforza & The Origins",
            desc: "타로의 기원은 15세기 북부 이탈리아(밀라노, 페라라, 볼로냐)의 귀족 사회로 거슬러 올라갑니다. 당시에는 점술 도구가 아닌 '트리온피(Trionfi, 승리)'라고 불리는 카드 게임을 위해 만들어졌습니다.\n\n가장 대표적인 '비스콘티-스포르차(Visconti-Sforza)' 덱은 밀라노의 공작 가문을 위해 유명 화가들이 직접 손으로 그리고 금박을 입혀 제작했습니다. 이는 단순한 놀이 도구를 넘어 권력과 부를 상징하는 예술품이었습니다.\n\n초기의 타로는 4개의 슈트(지팡이, 컵, 검, 동전)와 당시 중세 기독교 사회의 중요한 덕목이나 인물을 상징하는 22장의 '으뜸패(Trump)'로 구성되어 있었으며, 이것이 오늘날 메이저 아르카나의 원형이 되었습니다.",
            imgPlaceholder: "Visconti Style"
        },
        {
            year: "18th Century",
            title: "Tarot de Marseille & Occultism",
            desc: "18세기 프랑스, 특히 마르세유 지방은 타로 생산의 중심지가 되었습니다. 목판 인쇄 기술의 발달로 대량 생산이 가능해지면서 '마르세유 타로(Tarot de Marseille)'라는 표준화된 양식이 정립되었습니다. 선명한 원색(빨강, 파랑, 노랑)과 단순화된 화풍이 특징입니다.\n\n이 시기에 앙투안 쿠르 드 제블랭(Antoine Court de Gébelin)과 같은 프랑스 오컬트 학자들은 타로가 고대 이집트의 지혜를 담은 '토트의 서(Book of Thoth)'에서 유래했다고 주장했습니다. 이러한 신비주의적 해석이 더해지면서 타로는 단순한 게임을 넘어, 무의식과 영적 지혜를 탐구하는 점술의 도구로 재탄생하게 되었습니다.",
            imgPlaceholder: "Marseille Style"
        },
        {
            year: "1909",
            title: "Rider-Waite-Smith (RWS)",
            desc: "1909년, 영국의 황금새벽회(Golden Dawn) 출신인 아서 에드워드 웨이트(A.E. Waite)와 파멜라 콜먼 스미스(Pamela Colman Smith)는 타로 역사에 혁명을 일으켰습니다.\n\n기존의 마르세유 타로는 마이너 아르카나(숫자 카드)가 단순히 기하학적 문양으로만 그려져 있어 초보자가 해석하기 어려웠습니다. 스미스는 모든 마이너 아르카나 카드에 풍부한 상징과 인물 묘사를 담아, 그림만 보고도 직관적으로 의미를 유추할 수 있게 만들었습니다.\n\n'라이더-웨이트' 덱은 현대 타로의 표준이 되었으며, 오늘날 존재하는 수많은 타로 덱들의 원형이자 교과서로 여겨지고 있습니다.",
            imgPlaceholder: "Rider-Waite Style"
        },
        {
            year: "2026",
            title: "Digital Evolution: The Mystic",
            desc: "수백 년간 종이 위에 머물렀던 타로는 21세기에 이르러 디지털 공간으로 확장되었습니다. 융(Carl Jung)의 '동시성 이론(Synchronicity)'—우연처럼 보이는 사건들 사이의 의미 있는 연결—은 디지털 알고리즘의 무작위성과 만나 새로운 차원의 리딩을 가능하게 합니다.\n\n우리는 고대의 상징 체계를 현대적인 기술로 계승합니다. 인공지능은 수만 가지의 해석 데이터를 학습하여 개인의 상황에 맞는 가장 적절한 통찰을 즉각적으로 제시합니다. 물리적 제약을 넘어 언제 어디서나 내면의 목소리에 귀를 기울일 수 있는 시대, 이것이 바로 타로의 새로운 진화입니다.",
            imgPlaceholder: "Tarot 2026 App"
        }
    ];

    return (
        <SectionWrapper>
            <h2 className="section-title text-center" style={{ marginBottom: '4rem' }}>The Journey of Tarot</h2>

            <div className="elegant-history-container">
                {milestones.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`elegant-item ${index % 2 === 0 ? 'normal' : 'reverse'}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="elegant-image-box">
                            <img src={cardBackImage} alt={item.title} className="elegant-img" />
                            <div className="elegant-year-badge">{item.year}</div>
                        </div>

                        <div className="elegant-content-box">
                            <h3 className="elegant-title">{item.title}</h3>
                            <p className="elegant-desc">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
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
        case 'history': return <ElegantHistorySection />;
        case 'structure': return <StructureSection />;
        case 'how-to-read': return <UsageSection />;
        default: return null;
    }
};

export default GuideSections;
