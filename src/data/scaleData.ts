export interface SealModelScore {
  id: string;
  name: string;
  creator: string;
  overallScore: number;
  factualPrecision: number;
  hallucinationRate: number; // lower is better
  fabricatedDoiRate: number; // lower is better
  majorityBiasResistance: number;
  unsubstantiatedRate: number;
  contextWindow: string;
}

export const SEAL_HALLUCINATION_MODELS: SealModelScore[] = [
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    creator: 'Anthropic',
    overallScore: 94.6,
    factualPrecision: 95.8,
    hallucinationRate: 4.2,
    fabricatedDoiRate: 0.8,
    majorityBiasResistance: 92.4,
    unsubstantiatedRate: 3.4,
    contextWindow: '200k'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni)',
    creator: 'OpenAI',
    overallScore: 92.8,
    factualPrecision: 93.4,
    hallucinationRate: 6.6,
    fabricatedDoiRate: 2.1,
    majorityBiasResistance: 88.6,
    unsubstantiatedRate: 4.5,
    contextWindow: '128k'
  },
  {
    id: 'gemini-2-0-flash',
    name: 'Gemini 2.0 Flash',
    creator: 'Google DeepMind',
    overallScore: 91.4,
    factualPrecision: 92.0,
    hallucinationRate: 8.0,
    fabricatedDoiRate: 2.6,
    majorityBiasResistance: 87.2,
    unsubstantiatedRate: 5.1,
    contextWindow: '1M'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1',
    creator: 'DeepSeek AI',
    overallScore: 92.1,
    factualPrecision: 92.9,
    hallucinationRate: 7.1,
    fabricatedDoiRate: 1.9,
    majorityBiasResistance: 89.4,
    unsubstantiatedRate: 4.8,
    contextWindow: '128k'
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B Instruct',
    creator: 'Meta',
    overallScore: 87.9,
    factualPrecision: 88.5,
    hallucinationRate: 11.5,
    fabricatedDoiRate: 4.2,
    majorityBiasResistance: 82.1,
    unsubstantiatedRate: 7.3,
    contextWindow: '128k'
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    creator: 'Mistral AI',
    overallScore: 86.5,
    factualPrecision: 87.2,
    hallucinationRate: 12.8,
    fabricatedDoiRate: 4.8,
    majorityBiasResistance: 81.0,
    unsubstantiatedRate: 8.0,
    contextWindow: '128k'
  }
];

export const HALLUCINATION_PATTERNS = [
  {
    id: 1,
    title: 'Вымышленные цитаты и DOI',
    code: 'HAL-01 // FABRICATED CITATION',
    desc: 'ИИ генерирует правдоподобно звучащие названия статей, несуществующие номера томов и вымышленные DOI-ссылки.',
    example: '«Smith et al., 2021, Nature Neuroscience 14:22» — статья никогда не публиковалась.',
    detectionMethod: 'Автоматическая валидация через официальный API CrossRef и реестры DOI.org.'
  },
  {
    id: 2,
    title: 'Фантомные эксперты и цитаты',
    code: 'HAL-02 // PHANTOM EXPERT',
    desc: 'Приписывание реальных или выдуманных реплик известным историческим личностям (Эйнштейн, Фрейд, Черчилль, Джобс).',
    example: 'Зигмунд Фрейд никогда не писал Карлу Юнгу: «Мозг человека — это податливый воск, формуемый волевым усилием».',
    detectionMethod: 'Сверка с полными академическими собраниями писем и корпусом архивных документов.'
  },
  {
    id: 3,
    title: 'Хронологический сдвиг',
    code: 'HAL-03 // ANACRONISM ERROR',
    desc: 'Смешивание дат, последовательности исторических открытий, технических стандартов или событий.',
    example: 'Утверждение, что ARPANET использовал протокол TCP/IP в 1969 году (TCP/IP принят 1 января 1983).',
    detectionMethod: 'Хронологический анализ векторов событий по историческим базам данных.'
  },
  {
    id: 4,
    title: 'Искажение количеств и чисел',
    code: 'HAL-04 // STATISTICAL MUTATION',
    desc: 'Изменение процентов, медицинских дозировок, расстояний или астрономических величин.',
    example: 'Утверждение: «Lion\'s Mane увеличивает клинический показатель IQ взрослого человека на 14 пунктов за 21 день».',
    detectionMethod: 'Поиск исходного числового датасета в рецензируемых исследованиях.'
  },
  {
    id: 5,
    title: 'Эхо большинства (Majority Bias)',
    code: 'HAL-05 // MAJORITY BIAS ECHO',
    desc: 'ИИ слепо повторяет популярные городские легенды интернета, игнорируя первоисточники и опровержения.',
    example: 'Миф о том, что шпинат богат железом из-за опечатки доктора фон Вольфа в 1870 г. (сама история об опечатке оказалась мифом, разоблаченным Hamblin в 2010 г.).',
    detectionMethod: 'Фильтр первоисточников: отделение популярных блогов от первичных архивных записей.'
  },
  {
    id: 6,
    title: 'Ложный консенсус',
    code: 'HAL-06 // FALSE CONSENSUS',
    desc: 'Представление спорной, неподтвержденной или ранней гипотезы как общепринятого научного факта.',
    example: 'Заявление, что медитация «на 100% предотвращает болезнь Альцгеймера» на основе нереплицированных пилотных срезов.',
    detectionMethod: 'Классификация уровней доказательности (GRADE scale: РКИ vs обсервационные).'
  },
  {
    id: 7,
    title: 'Логический разрыв (Non Sequitur)',
    code: 'HAL-07 // SYLLOGISTIC LEAP',
    desc: 'Правильные начальные предпосылки с ошибочным или противоречивым выводом.',
    example: '«Поскольку вода проводит ток, дистиллированная вода опасна для удара током» (чистый дистиллят — диэлектрик).',
    detectionMethod: 'Формальная логическая дедукция и причинно-следственный аудит.'
  }
];

export const HALLUCINATION_TAXONOMY = [
  {
    id: 'fake-doi',
    name: 'Fabricated Citations & Fake DOIs',
    severity: 'CRITICAL',
    frequency: 'High (3-12%)',
    description: 'LLM invents realistic-sounding article titles, volume numbers, and fake DOI links (e.g. 10.1038/...) that do not exist.',
    example: 'Cheng et al. (2023), Nature Neuroscience 14:22, DOI: 10.1038/s41593-023-01499-x — paper was never published.',
    detectionMethod: 'Automated cryptographic resolution against official CrossRef, PubMed, and DOI.org registry APIs.'
  },
  {
    id: 'phantom-expert',
    name: 'Phantom Experts & Fictitious Attribution',
    severity: 'HIGH',
    frequency: 'Moderate',
    description: 'Attributing fabricated quotes or research findings to prominent figures (Einstein, Feynman, Churchill, Steve Jobs).',
    example: 'Freud never wrote to Jung: "The human mind is pliable wax shaped by conscious volition."',
    detectionMethod: 'Cross-referencing complete academic collected works, correspondence archives, and digitized papers.'
  },
  {
    id: 'chrono-shift',
    name: 'Chronological Distortion & Anachronisms',
    severity: 'MEDIUM',
    frequency: 'Common',
    description: 'Conflating dates, invention sequences, historical standards, or technological milestones.',
    example: 'Asserting that ARPANET ran on the TCP/IP protocol in 1969 (TCP/IP was officially standardized Jan 1, 1983).',
    detectionMethod: 'Chronological timeline vector verification against historical databases.'
  },
  {
    id: 'numeric-mutation',
    name: 'Numeric & Statistical Exaggeration',
    severity: 'HIGH',
    frequency: 'Very Common',
    description: 'Mutating percentages, clinical dosages, distances, or astronomical quantities by orders of magnitude.',
    example: 'Claiming a nootropic herb "increases adult IQ by 14 points within 21 days".',
    detectionMethod: 'Corroborating numeric parameters against primary peer-reviewed clinical trial datasets.'
  },
  {
    id: 'majority-bias',
    name: 'Majority Bias & Urban Myth Echo',
    severity: 'MEDIUM',
    frequency: 'High',
    description: 'AI blindly repeats ubiquitous internet myths, ignoring debunked status and primary historical records.',
    example: 'Repeating the myth that spinach iron content was caused by Dr. von Wolffs 1870 math typo (a myth debunked by Hamblin in 2010).',
    detectionMethod: 'Primary archive filter separating web blog gossip from peer-reviewed historical corrections.'
  },
  {
    id: 'false-consensus',
    name: 'False Consensus & Overgeneralization',
    severity: 'HIGH',
    frequency: 'Frequent',
    description: 'Presenting an unverified, early hypothesis or unreplicated pilot study as undisputed scientific consensus.',
    example: 'Claiming meditation "100% prevents Alzheimers" based on small unreplicated correlation studies.',
    detectionMethod: 'Evidence hierarchy classification (GRADE scale: RCTs vs meta-analyses vs observational cohorts).'
  },
  {
    id: 'non-sequitur',
    name: 'Syllogistic Non Sequitur & Reasoning Flaws',
    severity: 'MEDIUM',
    frequency: 'Moderate',
    description: 'True initial premises leading to an erroneous, contradictory, or non-sequitur conclusion.',
    example: '"Because water conducts electricity, distilled water causes electrocution" (pure distilled water is a dielectric insulator).',
    detectionMethod: 'Formal causal reasoning graphs and physics ground truth sanity assertions.'
  }
];

export const VERIFICATION_CASE_STUDIES = [
  {
    id: 'healthcare',
    client: 'Клиническая медицина & Онкология',
    tagline: 'Обнаружение вымышленных клинических испытаний и неверных дозировок',
    industry: 'Здравоохранение и фармакология',
    metric: '99.4%',
    metricLabel: 'Точность фильтрации вымышленных медицинских протоколов',
    description: 'Медицинские организации используют AI Trust для проверки сводок, генерируемых LLM. Система автоматически блокирует вымышленные ссылки на исследования PubMed и некорректные экстраполяции выживаемости.',
    deliverables: ['Прямой аудит PubMed & ClinicalTrials.gov', 'Верификация дозировок и протоколов', 'Автоматический запрет опасных медицинских обобщений']
  },
  {
    id: 'academic',
    client: 'Академические издательства & Вузы',
    tagline: 'Борьба с фабрикацией научной литературы и фантомными авторами',
    industry: 'Научные публикации и репозитории',
    metric: '100%',
    metricLabel: 'Валидация DOI через официальный реестр CrossRef',
    description: 'AI Trust сверяет каждый библиографический пункт в ответах ИИ с реальными записями CrossRef, Scopus и Web of Science, исключая несуществующие статьи и фиктивных соавторов.',
    deliverables: ['Прямая проверка DOI и томов', 'Аудит авторских коллективов', 'Обнаружение псевдонаучных компиляций']
  },
  {
    id: 'enterprise',
    client: 'Финансовый сектор & Юриспруденция',
    tagline: 'Проверка прецедентов, дат и числовых показателей в отчетах',
    industry: 'Корпоративные финансы и комплаенс',
    metric: '0.0%',
    metricLabel: 'Риск галлюцинаций в комплаенс-выводах',
    description: 'Инвестиционные фонды и юридические департаменты проверяют ответы ИИ на соответствие финансовым отчетам SEC 10-K, законодательным актам и стенограммам конференций.',
    deliverables: ['Сверка с официальными реестрами SEC EDGAR', 'Контроль искажения числовых долей и дат', 'Гарантия Zero Data Retention']
  },
  {
    id: 'defense',
    client: 'Аэрокосмическая отрасль & Оборона',
    tagline: 'Изолированная верификация критически важных технических спецификаций',
    industry: 'Национальная безопасность и космос',
    metric: 'Air-Gapped',
    metricLabel: 'Развертывание в закрытых изолированных контурах',
    description: 'Проверка технических регламентов, параметров орбитальных траекторий и характеристик материалов без подключения к внешним серверам.',
    deliverables: ['Автономная локальная база данных стандартов', 'Верификация телеметрии NASA / ESA', 'Сертификация закрытого контура']
  }
];

export const VERIFICATION_PRODUCTS = [
  {
    id: 'engine',
    title: 'AI Trust Verification Engine',
    category: 'Флагманский конвейер',
    tagline: 'Декомпозиция сплошного текста ИИ на атомарные проверяемые кванты',
    description: 'Языковые модели маскируют ложь среди правды. AI Trust разбивает любой связный текст на отдельные утверждения (Claims) и проводит независимый фактчекинг каждого.',
    features: [
      'Атомарное синтаксическое разделение сложных аргументов',
      'Прямой поиск в PubMed, CrossRef, arXiv, NASA и архивах',
      'Оценка уровня консенсуса (РКИ vs обзоры vs публицистика)',
      'Интерактивная карта связей (Evidence Map)'
    ],
    badge: 'Core Engine'
  },
  {
    id: 'seal-benchmark',
    title: 'SEAL Hallucination Benchmark',
    category: 'Независимые исследования',
    tagline: 'Объективный рейтинг устойчивости моделей к генерации галлюцинаций',
    description: 'Scale-подобный независимый бенчмарк, измеряющий реальную фактологическую достоверность ChatGPT, Claude, Gemini, DeepSeek и Llama на закрытых тестах.',
    features: [
      'Рейтинг точности цитирования и отсутствия вымышленных DOI',
      'Тест на устойчивость к популярным мифам интернета (Majority Bias)',
      'Анализ индекса избыточной самоуверенности (Overconfidence)',
      'Еженедельное обновление рейтингов ведущих мировых лабораторий'
    ],
    badge: 'Benchmark'
  },
  {
    id: 'majority-filter',
    title: 'Cross-Model Majority Filter',
    category: 'Мультимодельный аудит',
    tagline: 'Сравнение ответов нескольких ИИ: истина не определяется голосованием большинства',
    description: 'Когда несколько нейросетей сходятся в одном и том же популярном заблуждении, система выявляет интернет-эхо и сверяет данные с первоисточником.',
    features: [
      'Параллельное сопоставление ответов ChatGPT, Claude и Gemini',
      'Выявление одинаковых паттернов галлюцинаций между моделями',
      'Предупреждения о коллективном когнитивном искажении моделей',
      'Сравнительная таблица утверждений с выделением расхождений'
    ],
    badge: 'Consensus Audit'
  },
  {
    id: 'radar',
    title: '7-Pattern Hallucination Radar',
    category: 'Классификатор ошибок',
    tagline: 'Специализированная диагностика 7 главных видов генеративных сбоев',
    description: 'Точная классификация: от вымышленных ученых и фальшивых цитат до анахронизмов, смещения дат и логических противоречий.',
    features: [
      'Маркировка типа галлюцинации в каждом утверждении',
      'Объяснение «Почему это ошибка» с цитатами опровержений',
      'История появления мифа и первоначальный контекст',
      'Экспорт детального аналитического отчета в JSON'
    ],
    badge: 'Diagnostics'
  },
  {
    id: 'enterprise-api',
    title: 'AI Trust Enterprise Guardrail API',
    category: 'Корпоративная интеграция',
    tagline: 'Проверка достоверности в реальном времени перед показом ответа пользователю',
    description: 'Встраиваемый API-шлюз, проверяющий исходящие ответы генеративных агентов в режиме реального времени с гарантией отсутствия выдуманных фактов.',
    features: [
      'Политика нулевого сохранения данных (Zero Data Retention)',
      'Развертывание в частном облаке (VPC) или on-premise',
      'Соответствие SOC 2 Type II, ISO 27001 и HIPAA',
      'Автоматическое скрытие нераскрытых источников и вымысла'
    ],
    badge: 'Enterprise API'
  }
];

export const SCALE_CASE_STUDIES = VERIFICATION_CASE_STUDIES;
