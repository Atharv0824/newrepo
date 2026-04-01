import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAchievementTracker from '../hooks/useAchievementTracker';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const MockTests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackAction } = useAchievementTracker(user);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [testStats, setTestStats] = useState({ completed: 0 });
  
  // Test taking state
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testResults, setTestResults] = useState(null);
  
  const categories = ['All', 'JEE', 'NEET', 'CUET', 'BITSAT', 'VITEEE', 'General'];

  // Question Banks for each test
  const questionBanks = {
    1: { // JEE Main Full Syllabus - Complete Course Coverage
      questions: [
        // PHYSICS (Class 11-12 Full Syllabus)
        {
          id: 1,
          subject: 'Physics',
          question: 'A body is projected vertically upward with velocity v. It reaches a maximum height h. The ratio of kinetic energy to potential energy at height h/2 is:',
          options: ['1:1', '1:2', '2:1', '3:1'],
          correct: 0,
          explanation: 'At h/2, KE = PE (by conservation of energy). Total energy at top = mgh. At h/2, PE = mgh/2, so KE = mgh/2. Ratio = 1:1'
        },
        {
          id: 2,
          subject: 'Physics',
          question: 'The dimensional formula of angular momentum is:',
          options: ['[ML²T⁻¹]', '[MLT⁻¹]', '[ML²T⁻²]', '[M⁰L⁰T⁰]'],
          correct: 0,
          explanation: 'L = mvr = [M][LT⁻¹][L] = [ML²T⁻¹]. Angular momentum is a derived quantity.'
        },
        {
          id: 3,
          subject: 'Physics',
          question: 'Two particles of masses m₁ and m₂ moving with velocities v₁ and v₂ collide inelastically and stick together. The final velocity of the system is:',
          options: ['(m₁v₁ + m₂v₂)/(m₁ + m₂)', '(m₁v₁ - m₂v₂)/(m₁ + m₂)', '(v₁ + v₂)/2', '(v₁ - v₂)/2'],
          correct: 0,
          explanation: 'By conservation of linear momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f. Therefore, v_f = (m₁v₁ + m₂v₂)/(m₁ + m₂)'
        },
        {
          id: 4,
          subject: 'Physics',
          question: 'The escape velocity from Earth depends on:',
          options: ['Mass of the body', 'Radius of Earth only', 'Mass and radius of Earth', 'Direction of projection'],
          correct: 2,
          explanation: 'v_e = √(2GM/R). Escape velocity depends on both mass M and radius R of Earth, but not on mass of projectile or direction.'
        },
        {
          id: 5,
          subject: 'Physics',
          question: 'In SHM, acceleration is directly proportional to:',
          options: ['Displacement', 'Velocity', 'Time', 'Amplitude'],
          correct: 0,
          explanation: 'In SHM, a = -ω²x. Acceleration is directly proportional to displacement from mean position and directed towards it.'
        },
        {
          id: 6,
          subject: 'Physics',
          question: 'The electric field due to a dipole at large distances varies as:',
          options: ['1/r', '1/r²', '1/r³', '1/r⁴'],
          correct: 2,
          explanation: 'For an electric dipole, E ∝ p/r³ at large distances (r >> dipole length). Field decreases faster than point charge.'
        },
        {
          id: 7,
          subject: 'Physics',
          question: 'Kirchhoff\'s junction rule is based on conservation of:',
          options: ['Energy', 'Charge', 'Momentum', 'Mass'],
          correct: 1,
          explanation: 'ΣI(in) = ΣI(out) at a junction. This is conservation of charge - what flows in must flow out.'
        },
        {
          id: 8,
          subject: 'Physics',
          question: 'Lenz\'s law gives the direction of:',
          options: ['Induced current', 'Magnetic field', 'Electric field', 'Force'],
          correct: 0,
          explanation: 'Lenz\'s law: Induced current opposes the change causing it. It\'s based on conservation of energy.'
        },
        
        // CHEMISTRY (Physical, Organic, Inorganic)
        {
          id: 9,
          subject: 'Chemistry',
          question: 'Which of the following has the highest bond order?',
          options: ['O₂', 'O₂⁺', 'O₂⁻', 'O₂²⁻'],
          correct: 1,
          explanation: 'Bond order = (Nb - Na)/2. O₂⁺: (10-5)/2 = 2.5, O₂: (10-6)/2 = 2, O₂⁻: (10-7)/2 = 1.5, O₂²⁻: (10-8)/2 = 1'
        },
        {
          id: 10,
          subject: 'Chemistry',
          question: 'The hybridization of carbon in diamond is:',
          options: ['sp', 'sp²', 'sp³', 'sp³d'],
          correct: 2,
          explanation: 'Each carbon forms 4 σ bonds in tetrahedral geometry → sp³ hybridization. This creates the rigid 3D structure.'
        },
        {
          id: 11,
          subject: 'Chemistry',
          question: 'For a first-order reaction, the half-life is:',
          options: ['Independent of initial concentration', 'Directly proportional to initial concentration', 'Inversely proportional to initial concentration', 'Equal to rate constant'],
          correct: 0,
          explanation: 't₁/₂ = 0.693/k for first-order reactions. It\'s independent of [A]₀, characteristic of first-order kinetics.'
        },
        {
          id: 12,
          subject: 'Chemistry',
          question: 'The pH of 0.001 M HCl solution is:',
          options: ['1', '2', '3', '4'],
          correct: 2,
          explanation: 'HCl is strong acid, completely dissociates. [H⁺] = 0.001 = 10⁻³ M. pH = -log[H⁺] = 3'
        },
        {
          id: 13,
          subject: 'Chemistry',
          question: 'Which element has the highest electronegativity?',
          options: ['Oxygen', 'Nitrogen', 'Fluorine', 'Chlorine'],
          correct: 2,
          explanation: 'Fluorine (F) has electronegativity = 4.0 (Pauling scale), highest among all elements.'
        },
        {
          id: 14,
          subject: 'Chemistry',
          question: 'IUPAC name of CH₃CH₂CHO is:',
          options: ['Propanal', 'Propanone', 'Ethanal', 'Butanal'],
          correct: 0,
          explanation: '3-carbon aldehyde: CH₃-CH₂-CHO. Parent chain: propane. Functional group: -al → Propanal'
        },
        {
          id: 15,
          subject: 'Chemistry',
          question: 'Markovnikov\'s rule applies to addition of:',
          options: ['H₂ to alkene', 'Br₂ to alkene', 'HBr to alkene', 'H₂O to alkene'],
          correct: 2,
          explanation: 'In unsymmetrical alkene + HBr, H adds to carbon with more H atoms. Br adds to carbon with fewer H atoms.'
        },
        
        // MATHEMATICS (Algebra, Calculus, Coordinate Geometry)
        {
          id: 16,
          subject: 'Mathematics',
          question: 'If f(x) = x² - 3x + 2, then f(f(2)) equals:',
          options: ['0', '1', '2', '3'],
          correct: 2,
          explanation: 'f(2) = 4 - 6 + 2 = 0. Then f(f(2)) = f(0) = 0 - 0 + 2 = 2'
        },
        {
          id: 17,
          subject: 'Mathematics',
          question: 'The number of ways to arrange 5 books on a shelf is:',
          options: ['60', '120', '24', '125'],
          correct: 1,
          explanation: 'Permutation of n distinct objects = n! = 5! = 5×4×3×2×1 = 120'
        },
        {
          id: 18,
          subject: 'Mathematics',
          question: 'lim(x→0) (sin x)/x equals:',
          options: ['0', '1', '∞', 'Does not exist'],
          correct: 1,
          explanation: 'Standard limit: lim(x→0) (sin x)/x = 1. This is a fundamental limit in calculus.'
        },
        {
          id: 19,
          subject: 'Mathematics',
          question: 'The derivative of sin(x²) with respect to x is:',
          options: ['cos(x²)', '2x cos(x²)', 'cos(2x)', '-cos(x²)'],
          correct: 1,
          explanation: 'Using chain rule: d/dx[sin(u)] = cos(u)·du/dx where u=x². So = cos(x²)·2x = 2x cos(x²)'
        },
        {
          id: 20,
          subject: 'Mathematics',
          question: 'The equation of circle with center (0,0) and radius 5 is:',
          options: ['x² + y² = 5', 'x² + y² = 25', 'x² + y² = 10', '(x-5)² + (y-5)² = 25'],
          correct: 1,
          explanation: 'Standard form: (x-h)² + (y-k)² = r². With center (0,0) and r=5: x² + y² = 25'
        }
      ]
    },
    2: { // NEET Biology - Complete NCERT Coverage
      questions: [
        // BOTANY (Class 11-12)
        {
          id: 1,
          subject: 'Botany',
          question: 'Which plant hormone promotes fruit ripening?',
          options: ['Auxin', 'Gibberellin', 'Ethylene', 'Cytokinin'],
          correct: 2,
          explanation: 'Ethylene is a gaseous plant hormone that triggers fruit ripening by activating enzymes that break down cell walls'
        },
        {
          id: 2,
          subject: 'Botany',
          question: 'The site of photosynthesis in plants is:',
          options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Nucleus'],
          correct: 1,
          explanation: 'Chloroplasts contain chlorophyll which captures light energy for photosynthesis. Thylakoid membranes house the light reactions.'
        },
        {
          id: 3,
          subject: 'Botany',
          question: 'In C4 plants, CO2 fixation occurs in:',
          options: ['Mesophyll cells', 'Bundle sheath cells', 'Both', 'Epidermal cells'],
          correct: 1,
          explanation: 'C4 pathway: Initial fixation in mesophyll (PEP carboxylase), then transfer to bundle sheath cells for Calvin cycle (RuBisCO)'
        },
        {
          id: 4,
          subject: 'Botany',
          question: 'The respiratory quotient (RQ) for carbohydrates is:',
          options: ['0.7', '0.9', '1.0', '>1'],
          correct: 2,
          explanation: 'RQ = CO2 produced/O2 consumed. For glucose: C6H12O6 + 6O2 → 6CO2 + 6H2O. RQ = 6/6 = 1.0'
        },
        {
          id: 5,
          subject: 'Botany',
          question: 'DNA replication occurs during which phase of cell cycle?',
          options: ['G₁ phase', 'S phase', 'G₂ phase', 'M phase'],
          correct: 1,
          explanation: 'DNA synthesis/replication occurs during S (synthesis) phase of interphase. Chromosomes duplicate but remain as sister chromatids.'
        },
        {
          id: 6,
          subject: 'Botany',
          question: 'Which tissue conducts water in plants?',
          options: ['Phloem', 'Xylem', 'Parenchyma', 'Collenchyma'],
          correct: 1,
          explanation: 'Xylem transports water and minerals from roots to leaves. Tracheids and vessels are main conducting elements.'
        },
        
        // ZOOLOGY (Class 11-12)
        {
          id: 7,
          subject: 'Zoology',
          question: 'Human heart is:',
          options: ['Neurogenic', 'Myogenic', 'Both', 'None'],
          correct: 1,
          explanation: 'Human heart is myogenic - it generates its own impulses through SA node without needing external nerve stimulation'
        },
        {
          id: 8,
          subject: 'Zoology',
          question: 'Number of chromosomes in human gametes is:',
          options: ['46', '23', '44', '22'],
          correct: 1,
          explanation: 'Humans have 46 chromosomes (23 pairs) in somatic cells. Gametes are haploid with n=23 chromosomes after meiosis.'
        },
        {
          id: 9,
          subject: 'Zoology',
          question: 'The functional unit of kidney is:',
          options: ['Neuron', 'Nephron', 'Alveolus', 'Villus'],
          correct: 1,
          explanation: 'Nephron is the structural and functional unit of kidney. Each kidney has ~1 million nephrons for filtration.'
        },
        {
          id: 10,
          subject: 'Zoology',
          question: 'Insulin is secreted by which cells of pancreas?',
          options: ['Alpha cells', 'Beta cells', 'Acinar cells', 'Duct cells'],
          correct: 1,
          explanation: 'Beta cells of Islets of Langerhans secrete insulin. Alpha cells secrete glucagon. Both regulate blood sugar.'
        },
        {
          id: 11,
          subject: 'Zoology',
          question: 'Crossing over occurs during which stage of meiosis?',
          options: ['Leptotene', 'Zygotene', 'Pachytene', 'Diplotene'],
          correct: 2,
          explanation: 'Crossing over (genetic recombination) occurs in pachytene stage when homologous chromosomes pair up tightly.'
        },
        {
          id: 12,
          subject: 'Zoology',
          question: 'Universal donor blood group is:',
          options: ['A', 'B', 'AB', 'O negative'],
          correct: 3,
          explanation: 'O negative has no A or B antigens and no Rh factor. Can be donated to anyone in emergencies.'
        },
        {
          id: 13,
          subject: 'Zoology',
          question: 'The longest bone in human body is:',
          options: ['Tibia', 'Femur', 'Humerus', 'Radius'],
          correct: 1,
          explanation: 'Femur (thigh bone) is the longest and strongest bone. Extends from hip to knee, supports body weight.'
        },
        {
          id: 14,
          subject: 'Zoology',
          question: 'Protein digestion begins in:',
          options: ['Mouth', 'Stomach', 'Small intestine', 'Large intestine'],
          correct: 1,
          explanation: 'Pepsin in stomach (activated from pepsinogen by HCl) begins protein breakdown into peptones. Continues in small intestine.'
        }
      ]
    },
    3: { // CUET General Aptitude - Complete Syllabus
      questions: [
        // REASONING & LOGICAL ABILITY
        {
          id: 1,
          subject: 'Reasoning',
          question: 'Complete the series: 2, 6, 12, 20, 30, ?',
          options: ['40', '42', '44', '46'],
          correct: 1,
          explanation: 'Pattern: +4, +6, +8, +10, +12. So 30+12 = 42. Or formula: n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7=42'
        },
        {
          id: 2,
          subject: 'Reasoning',
          question: 'If CAT is coded as 3120, how is DOG coded?',
          options: ['4157', '3147', '4158', '3157'],
          correct: 0,
          explanation: 'C=3, A=1, T=20 (position in alphabet). Similarly D=4, O=15, G=7 → 4157'
        },
        {
          id: 3,
          subject: 'Logical',
          question: 'All cats are animals. Some animals are pets. Conclusion:',
          options: ['Some cats are pets', 'All pets are cats', 'No conclusion', 'Some pets are cats'],
          correct: 2,
          explanation: 'From given statements, we cannot establish any definite relationship between cats and pets. This is undistributed middle fallacy'
        },
        {
          id: 4,
          subject: 'Reasoning',
          question: 'Find the odd one out: Square, Circle, Triangle, Rectangle',
          options: ['Square', 'Circle', 'Triangle', 'Rectangle'],
          correct: 1,
          explanation: 'Circle is the only curved shape. All others (square, triangle, rectangle) have straight sides and angles.'
        },
        
        // QUANTITATIVE APTITUDE
        {
          id: 5,
          subject: 'Quantitative',
          question: 'If 15% of a number is 45, what is 25% of that number?',
          options: ['65', '70', '75', '80'],
          correct: 2,
          explanation: 'Let number be x. 0.15x = 45, so x = 300. Then 0.25 × 300 = 75'
        },
        {
          id: 6,
          subject: 'Quantitative',
          question: 'A train running at 60 km/hr crosses a pole in 9 seconds. Length of train is:',
          options: ['120 m', '150 m', '180 m', '200 m'],
          correct: 1,
          explanation: 'Speed = 60 × (5/18) = 50/3 m/s. Distance = Speed × Time = (50/3) × 9 = 150 m'
        },
        {
          id: 7,
          subject: 'Quantitative',
          question: 'If A:B = 2:3 and B:C = 4:5, then A:B:C is:',
          options: ['2:3:5', '8:12:15', '4:6:10', '2:4:5'],
          correct: 1,
          explanation: 'Make B same: A:B = 8:12, B:C = 12:15. Therefore A:B:C = 8:12:15'
        },
        {
          id: 8,
          subject: 'Quantitative',
          question: 'Simple interest on Rs. 1000 at 10% per annum for 2 years is:',
          options: ['Rs. 100', 'Rs. 150', 'Rs. 200', 'Rs. 250'],
          correct: 2,
          explanation: 'SI = (P×R×T)/100 = (1000×10×2)/100 = Rs. 200'
        },
        
        // VERBAL ABILITY
        {
          id: 9,
          subject: 'Verbal',
          question: 'Choose the synonym of "EPHEMERAL":',
          options: ['Permanent', 'Short-lived', 'Eternal', 'Lasting'],
          correct: 1,
          explanation: 'Ephemeral means lasting for a very short time. Synonym: Short-lived, Transient, Fleeting'
        },
        {
          id: 10,
          subject: 'Verbal',
          question: 'Antonym of "ZENITH" is:',
          options: ['Peak', 'Summit', 'Nadir', 'Apex'],
          correct: 2,
          explanation: 'Zenith = highest point. Nadir = lowest point. They are opposites.'
        },
        {
          id: 11,
          subject: 'Verbal',
          question: 'Fill in the blank: He was _____ by the beauty of Taj Mahal.',
          options: ['mesmerized', 'criticized', 'terrorized', 'ostracized'],
          correct: 0,
          explanation: 'Mesmerized = captivated, spellbound. The sentence expresses being impressed by beauty.'
        },
        
        // GENERAL KNOWLEDGE
        {
          id: 12,
          subject: 'GK',
          question: 'Capital of India is:',
          options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'],
          correct: 2,
          explanation: 'New Delhi is the capital of India. It houses all three branches of Indian government.'
        },
        {
          id: 13,
          subject: 'GK',
          question: 'Who is known as Father of Nation in India?',
          options: ['Nehru', 'Gandhiji', 'Bose', 'Patel'],
          correct: 1,
          explanation: 'Mahatma Gandhi is called Father of Nation for his leadership in India\'s freedom struggle through non-violence.'
        }
      ]
    },
    4: { // BITSAT Mathematics - Complete Syllabus
      questions: [
        // CALCULUS
        {
          id: 1,
          subject: 'Calculus',
          question: '∫₀^π sin²x dx equals:',
          options: ['π/4', 'π/2', 'π', '2π'],
          correct: 1,
          explanation: 'Using ∫₀^a f(x)dx = ∫₀^a f(a-x)dx and sin²x + cos²x = 1, we get I = π/2'
        },
        {
          id: 2,
          subject: 'Calculus',
          question: 'The derivative of e^(2x) is:',
          options: ['e^(2x)', '2e^(2x)', 'e^x', '2xe^(2x-1)'],
          correct: 1,
          explanation: 'd/dx[e^(ax)] = a·e^(ax). So d/dx[e^(2x)] = 2e^(2x)'
        },
        {
          id: 3,
          subject: 'Calculus',
          question: 'lim(x→∞) (1 + 1/x)^x equals:',
          options: ['0', '1', 'e', '∞'],
          correct: 2,
          explanation: 'This is the standard definition of e (Euler\'s number). lim(x→∞) (1 + 1/x)^x = e ≈ 2.718'
        },
        
        // ALGEBRA
        {
          id: 4,
          subject: 'Algebra',
          question: 'If A and B are matrices such that AB = A and BA = B, then:',
          options: ['A² = A', 'B² = B', 'Both', 'Neither'],
          correct: 2,
          explanation: 'A² = A(BA) = (AB)A = AA = A. Similarly B² = B(AB) = (BA)B = BB = B'
        },
        {
          id: 5,
          subject: 'Algebra',
          question: 'The sum of first n natural numbers is:',
          options: ['n(n+1)/2', 'n²', 'n(n-1)/2', '(2n-1)'],
          correct: 0,
          explanation: 'Sum = 1 + 2 + 3 + ... + n = n(n+1)/2. This is arithmetic progression formula.'
        },
        {
          id: 6,
          subject: 'Algebra',
          question: 'If roots of ax² + bx + c = 0 are equal, then:',
          options: ['b² = 4ac', 'b² > 4ac', 'b² < 4ac', 'b² = ac'],
          correct: 0,
          explanation: 'For equal roots, discriminant D = b² - 4ac = 0. Therefore b² = 4ac'
        },
        
        // COORDINATE GEOMETRY
        {
          id: 7,
          subject: 'Coordinate Geometry',
          question: 'The focus of parabola y² = 4ax is:',
          options: ['(a,0)', '(0,a)', '(-a,0)', '(0,-a)'],
          correct: 0,
          explanation: 'Standard form y² = 4ax has vertex at origin and focus at (a,0) on positive x-axis'
        },
        {
          id: 8,
          subject: 'Coordinate Geometry',
          question: 'Eccentricity of ellipse x²/a² + y²/b² = 1 (a>b) is:',
          options: ['√(1-b²/a²)', '√(1+a²/b²)', '√(a²-b²)', 'b/a'],
          correct: 0,
          explanation: 'For ellipse, e = √(1 - b²/a²) where a is semi-major axis, b is semi-minor axis'
        },
        {
          id: 9,
          subject: 'Coordinate Geometry',
          question: 'Distance between points (1,2) and (4,6) is:',
          options: ['3', '4', '5', '6'],
          correct: 2,
          explanation: 'Distance = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5 units'
        },
        
        // VECTORS & 3D
        {
          id: 10,
          subject: 'Vectors',
          question: 'If |a⃗| = 3, |b⃗| = 4 and angle between them is 60°, then a⃗·b⃗ equals:',
          options: ['6', '12', '3√3', '6√3'],
          correct: 0,
          explanation: 'a⃗·b⃗ = |a⃗||b⃗|cosθ = 3×4×cos60° = 12×(1/2) = 6'
        },
        {
          id: 11,
          subject: 'Vectors',
          question: 'Cross product of two parallel vectors is:',
          options: ['Unit vector', 'Zero vector', 'Same vector', 'Infinite'],
          correct: 1,
          explanation: 'a⃗ × b⃗ = |a||b|sinθ n̂. For parallel vectors, θ=0°, sin0°=0, so cross product is zero vector'
        },
        
        // PROBABILITY & STATISTICS
        {
          id: 12,
          subject: 'Probability',
          question: 'Probability of getting sum 9 when two dice are thrown is:',
          options: ['1/9', '1/6', '1/12', '5/36'],
          correct: 0,
          explanation: 'Favorable outcomes: (3,6), (4,5), (5,4), (6,3) = 4. Total = 36. P = 4/36 = 1/9'
        },
        {
          id: 13,
          subject: 'Probability',
          question: 'Mean of first 5 natural numbers is:',
          options: ['2', '2.5', '3', '3.5'],
          correct: 2,
          explanation: 'Mean = (1+2+3+4+5)/5 = 15/5 = 3'
        }
      ]
    },
    5: { // VITEEEE Physics - Complete Syllabus
      questions: [
        // MECHANICS
        {
          id: 1,
          subject: 'Mechanics',
          question: 'Moment of inertia of solid sphere about diameter:',
          options: ['(2/5)MR²', '(2/3)MR²', '(1/2)MR²', 'MR²'],
          correct: 0,
          explanation: 'For solid sphere, I = (2/5)MR² about any diameter (standard result from rotational mechanics)'
        },
        {
          id: 2,
          subject: 'Mechanics',
          question: 'Newton\'s second law gives the measure of:',
          options: ['Force', 'Momentum', 'Energy', 'Power'],
          correct: 0,
          explanation: 'F = ma (Second law). Force equals rate of change of momentum. It defines force quantitatively.'
        },
        {
          id: 3,
          subject: 'Mechanics',
          question: 'Gravitational potential energy is maximum at:',
          options: ['Earth surface', 'Center of Earth', 'Infinity', 'Height h above surface'],
          correct: 2,
          explanation: 'U = -GMm/r. At infinity, r→∞, U→0 (maximum). At surface, U is negative (minimum)'
        },
        
        // THERMODYNAMICS
        {
          id: 4,
          subject: 'Thermodynamics',
          question: 'Efficiency of Carnot engine working between 400K and 300K is:',
          options: ['25%', '50%', '75%', '100%'],
          correct: 0,
          explanation: 'η = 1 - T₂/T₁ = 1 - 300/400 = 0.25 = 25%. Maximum possible efficiency for given temperatures.'
        },
        {
          id: 5,
          subject: 'Thermodynamics',
          question: 'First law of thermodynamics is based on conservation of:',
          options: ['Mass', 'Energy', 'Momentum', 'Charge'],
          correct: 1,
          explanation: 'ΔQ = ΔU + ΔW. Heat supplied = Change in internal energy + Work done. This is conservation of energy.'
        },
        
        // ELECTROMAGNETISM
        {
          id: 6,
          subject: 'Electromagnetism',
          question: 'Unit of magnetic flux density is:',
          options: ['Tesla', 'Weber', 'Henry', 'Gauss'],
          correct: 0,
          explanation: 'Tesla (T) is SI unit of magnetic flux density B. 1 T = 1 Wb/m²'
        },
        {
          id: 7,
          subject: 'Electromagnetism',
          question: 'Electric field inside a conductor is:',
          options: ['Zero', 'Infinite', 'Constant', 'Variable'],
          correct: 0,
          explanation: 'In electrostatic equilibrium, E = 0 inside conductor. All excess charge resides on surface.'
        },
        {
          id: 8,
          subject: 'Electromagnetism',
          question: 'Faraday\'s law gives the direction of:',
          options: ['Induced current', 'Induced emf', 'Magnetic field', 'Both 1 and 2'],
          correct: 1,
          explanation: 'Faraday\'s law: ε = -dΦ/dt gives magnitude of induced emf. Lenz\'s law gives direction.'
        },
        
        // OPTICS
        {
          id: 9,
          subject: 'Optics',
          question: 'Refractive index of diamond is approximately:',
          options: ['1.5', '2.0', '2.42', '3.0'],
          correct: 2,
          explanation: 'Diamond has high refractive index of 2.42, which causes total internal reflection and brilliance'
        },
        {
          id: 10,
          subject: 'Optics',
          question: 'Power of lens is measured in:',
          options: ['Meter', 'Diopter', 'Watt', 'Candela'],
          correct: 1,
          explanation: 'Power P = 1/f (in meters). Unit is Diopter (D). Convex lens has positive power.'
        },
        {
          id: 11,
          subject: 'Optics',
          question: 'Interference occurs in:',
          options: ['Light only', 'Sound only', 'Water waves only', 'All waves'],
          correct: 3,
          explanation: 'Interference is a wave phenomenon. Occurs in all types of waves: light, sound, water, matter waves.'
        },
        
        // MODERN PHYSICS
        {
          id: 12,
          subject: 'Modern Physics',
          question: 'Work function is minimum for:',
          options: ['Copper', 'Aluminium', 'Cesium', 'Iron'],
          correct: 2,
          explanation: 'Cesium has lowest work function (~2.14 eV), making it ideal for photoelectric emission'
        },
        {
          id: 13,
          subject: 'Modern Physics',
          question: 'Half-life of radioactive element depends on:',
          options: ['Temperature', 'Pressure', 'Nature of element', 'Mass'],
          correct: 2,
          explanation: 'Half-life is characteristic property of radioactive element. Independent of external conditions like T, P.'
        },
        {
          id: 14,
          subject: 'Modern Physics',
          question: 'Bohr model successfully explained spectrum of:',
          options: ['Hydrogen', 'Helium', 'All atoms', 'Molecules'],
          correct: 0,
          explanation: 'Bohr model works only for hydrogen-like atoms (single electron systems: H, He+, Li++, etc.)'
        }
      ]
    }
  };

  const mockTests = [
    {
      id: 1,
      title: 'JEE Main Full Syllabus Test',
      category: 'JEE',
      duration: '180 mins',
      questions: 90,
      marks: 360,
      difficulty: 'Hard',
      attempts: 1250,
      rating: 4.8,
      description: 'Complete syllabus mock test for JEE Main with Physics, Chemistry, and Mathematics'
    },
    {
      id: 2,
      title: 'NEET Biology Complete Test',
      category: 'NEET',
      duration: '120 mins',
      questions: 90,
      marks: 360,
      difficulty: 'Medium',
      attempts: 980,
      rating: 4.7,
      description: 'Comprehensive biology test covering Botany and Zoology'
    },
    {
      id: 3,
      title: 'CUET General Aptitude Test',
      category: 'CUET',
      duration: '60 mins',
      questions: 50,
      marks: 250,
      difficulty: 'Easy',
      attempts: 2100,
      rating: 4.6,
      description: 'General aptitude and reasoning test for CUET preparation'
    },
    {
      id: 4,
      title: 'BITSAT Mathematics Test',
      category: 'BITSAT',
      duration: '60 mins',
      questions: 45,
      marks: 180,
      difficulty: 'Hard',
      attempts: 756,
      rating: 4.9,
      description: 'Advanced mathematics test covering calculus, algebra, and geometry'
    },
    {
      id: 5,
      title: 'VITEEEE Physics Mock Test',
      category: 'VITEEE',
      duration: '80 mins',
      questions: 50,
      marks: 200,
      difficulty: 'Medium',
      attempts: 645,
      rating: 4.5,
      description: 'Physics test covering mechanics, thermodynamics, and electromagnetism'
    },
    {
      id: 6,
      title: 'JEE Advanced Chemistry',
      category: 'JEE',
      duration: '90 mins',
      questions: 36,
      marks: 144,
      difficulty: 'Very Hard',
      attempts: 534,
      rating: 4.9,
      description: 'Challenging chemistry test for JEE Advanced aspirants'
    },
    {
      id: 7,
      title: 'NEET Full Syllabus Mock',
      category: 'NEET',
      duration: '180 mins',
      questions: 180,
      marks: 720,
      difficulty: 'Hard',
      attempts: 1450,
      rating: 4.8,
      description: 'Complete PCB mock test simulating actual NEET exam pattern'
    },
    {
      id: 8,
      title: 'General Reasoning & Logic',
      category: 'General',
      duration: '45 mins',
      questions: 40,
      marks: 160,
      difficulty: 'Easy',
      attempts: 3200,
      rating: 4.4,
      description: 'Logical reasoning and analytical ability test'
    }
  ];

  const filteredTests = selectedCategory === 'All' 
    ? mockTests 
    : mockTests.filter(test => test.category === selectedCategory);

  // Timer effect
  useEffect(() => {
    if (activeTest && timeLeft > 0 && !testSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && activeTest && !testSubmitted) {
      handleSubmitTest(); // Auto-submit when time expires
    }
  }, [timeLeft, activeTest, testSubmitted]);

  const handleStartTest = (testId) => {
    const test = mockTests.find(t => t.id === testId);
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestSubmitted(false);
    setTestResults(null);
    
    // Set timer in seconds
    const durationInMinutes = parseInt(test.duration);
    setTimeLeft(durationInMinutes * 60);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < getQuestions().length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getQuestions = () => {
    if (!activeTest) return [];
    const bank = questionBanks[activeTest.id];
    return bank ? bank.questions : [];
  };

  const calculateResults = () => {
    const questions = getQuestions();
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    let score = 0;
    const totalMarks = activeTest.marks;
    const marksPerQuestion = totalMarks / questions.length;

    questions.forEach(q => {
      const userAnswer = answers[q.id];
      if (userAnswer === undefined) {
        unattempted++;
      } else if (userAnswer === q.correct) {
        correct++;
        score += marksPerQuestion;
      } else {
        wrong++;
        // Negative marking: -1/4 for wrong answers (JEE pattern)
        score -= marksPerQuestion * 0.25;
      }
    });

    return {
      totalQuestions: questions.length,
      correct,
      wrong,
      unattempted,
      score: Math.round(score),
      percentage: Math.round((score / totalMarks) * 100),
      accuracy: correct > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0
    };
  };

  const handleSubmitTest = async () => {
    const results = calculateResults();
    setTestResults(results);
    setTestSubmitted(true);
    
    // Track achievement
    if (user) {
      await trackAction('TEST_COMPLETED', { 
        testId: activeTest.id,
        testName: activeTest.title,
        score: results.score,
        percentage: results.percentage
      });
      setTestStats(prev => ({ completed: prev.completed + 1 }));
    }
  };

  const handleExitTest = () => {
    setActiveTest(null);
    setTestSubmitted(false);
    setTestResults(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
      case 'Very Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Test Taking Interface
  if (activeTest && !testSubmitted) {
    const questions = getQuestions();
    const currentQ = questions[currentQuestionIndex];
    const isAnswered = answers[currentQ?.id] !== undefined;
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Test Header */}
              <Card className="bg-white mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{activeTest.title}</h1>
                    <p className="text-gray-600 mt-1">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-indigo-600'}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm text-gray-500">Time Remaining</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{answeredCount} answered</span>
                    <span>{questions.length - answeredCount} remaining</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                      style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </Card>

              {/* Question Card */}
              <Card className="bg-white mb-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                      {currentQ.subject}
                    </span>
                    <span className="text-gray-500 text-sm">Question {currentQuestionIndex + 1}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                    {currentQ.question}
                  </h2>

                  <div className="space-y-3">
                    {currentQ.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(currentQ.id, idx)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                          answers[currentQ.id] === idx
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                            answers[currentQ.id] === idx
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-base">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    ← Previous
                  </Button>

                  <div className="flex gap-2">
                    {questions.map((q, idx) => (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          idx === currentQuestionIndex
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : answers[q.id] !== undefined
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                      variant="primary"
                      onClick={handleSubmitTest}
                      disabled={answeredCount === 0}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Test ✓
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleNextQuestion}
                      disabled={!isAnswered}
                    >
                      Next →
                    </Button>
                  )}
                </div>
              </Card>

              {/* Instructions */}
              <Card className="bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">⚡ Test Instructions:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Click on an option to select your answer</li>
                  <li>• Use Previous/Next buttons to navigate</li>
                  <li>• You can change your answer anytime before submission</li>
                  <li>• Test will auto-submit when time expires</li>
                  <li>• Negative marking: -0.25 for wrong answers</li>
                </ul>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Results Display
  if (testSubmitted && testResults) {
    const questions = getQuestions();
    
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Score Summary */}
              <Card className="bg-white mb-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    🎉 Test Submitted!
                  </div>
                  <p className="text-gray-600">Here's your detailed performance analysis</p>
                </div>

                {/* Main Score Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
                    <div className="text-6xl font-bold text-indigo-600 mb-2">
                      {testResults.score}
                    </div>
                    <div className="text-indigo-800 font-semibold text-lg">Total Score</div>
                    <div className="text-indigo-600 mt-2">out of {activeTest.marks} marks</div>
                  </div>

                  <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                    <div className="text-6xl font-bold text-green-600 mb-2">
                      {testResults.percentage}%
                    </div>
                    <div className="text-green-800 font-semibold text-lg">Percentage</div>
                    <div className="text-green-600 mt-2">
                      {testResults.accuracy}% accuracy
                    </div>
                  </div>

                  <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-200">
                    <div className="text-6xl font-bold text-orange-600 mb-2">
                      {testResults.totalQuestions}
                    </div>
                    <div className="text-orange-800 font-semibold text-lg">Total Questions</div>
                    <div className="text-orange-600 mt-2">{activeTest.duration} duration</div>
                  </div>
                </div>

                {/* Detailed Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-4xl">✅</div>
                      <div className="text-4xl font-bold text-green-600">{testResults.correct}</div>
                    </div>
                    <div className="text-green-800 font-semibold">Correct Answers</div>
                    <div className="text-sm text-green-600 mt-1">
                      +{Math.round(testResults.correct * (activeTest.marks / activeTest.questions))} marks
                    </div>
                  </div>

                  <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-4xl">❌</div>
                      <div className="text-4xl font-bold text-red-600">{testResults.wrong}</div>
                    </div>
                    <div className="text-red-800 font-semibold">Wrong Answers</div>
                    <div className="text-sm text-red-600 mt-1">
                      -{Math.round(testResults.wrong * (activeTest.marks / activeTest.questions) * 0.25)} marks (negative)
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-4xl">⏭️</div>
                      <div className="text-4xl font-bold text-gray-600">{testResults.unattempted}</div>
                    </div>
                    <div className="text-gray-800 font-semibold">Unattempted</div>
                    <div className="text-sm text-gray-600 mt-1">No marks awarded</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    onClick={handleExitTest}
                    className="flex-1"
                  >
                    Back to All Tests
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleStartTest(activeTest.id)}
                    className="flex-1"
                  >
                    🔄 Retake Test
                  </Button>
                </div>
              </Card>

              {/* Solution Review */}
              <Card className="bg-white">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">📖 Detailed Solutions</h2>
                <p className="text-gray-600 mb-6">
                  Review all questions with correct answers and explanations
                </p>

                <div className="space-y-6">
                  {questions.map((q, idx) => {
                    const userAnswer = answers[q.id];
                    const isCorrect = userAnswer === q.correct;
                    const isSkipped = userAnswer === undefined;

                    return (
                      <div 
                        key={q.id} 
                        className={`p-6 rounded-xl border-2 ${
                          isCorrect 
                            ? 'bg-green-50 border-green-200' 
                            : isSkipped
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <span className={`text-2xl font-bold ${
                            isCorrect ? 'text-green-600' : isSkipped ? 'text-gray-400' : 'text-red-600'
                          }`}>
                            {isCorrect ? '✓' : isSkipped ? '○' : '✗'}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-semibold">
                                {q.subject}
                              </span>
                              <span className="text-sm text-gray-600">Question {idx + 1}</span>
                            </div>
                            <p className="text-lg font-semibold text-gray-900 mb-3">
                              {q.question}
                            </p>

                            <div className="grid md:grid-cols-2 gap-3 mb-4">
                              {q.options.map((opt, optIdx) => (
                                <div 
                                  key={optIdx}
                                  className={`p-3 rounded-lg border-2 ${
                                    optIdx === q.correct
                                      ? 'bg-green-100 border-green-400 text-green-900'
                                      : userAnswer === optIdx && !isCorrect
                                      ? 'bg-red-100 border-red-400 text-red-900'
                                      : 'bg-white border-gray-200 text-gray-700'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                                    <span>{opt}</span>
                                    {optIdx === q.correct && <span className="ml-auto text-green-600">✓ Correct</span>}
                                    {userAnswer === optIdx && !isCorrect && <span className="ml-auto text-red-600">✗ Your Answer</span>}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {isSkipped && (
                              <div className="text-gray-600 italic mb-2">
                                ⚠️ This question was not attempted
                              </div>
                            )}

                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <div className="flex items-start gap-2">
                                <span className="text-blue-600 text-xl">💡</span>
                                <div>
                                  <div className="font-semibold text-blue-900 mb-1">Explanation:</div>
                                  <p className="text-gray-700 leading-relaxed">{q.explanation}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">📝 Mock Tests</h1>
              <p className="text-xl text-gray-600">
                Practice with real exam patterns and improve your scores
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-indigo-600">{mockTests.length}</div>
                <div className="text-gray-600 mt-1">Total Tests</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-teal-600">8,915</div>
                <div className="text-gray-600 mt-1">Total Attempts</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-purple-600">4.7</div>
                <div className="text-gray-600 mt-1">Avg Rating</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-gray-600 mt-1">Free Access</div>
              </Card>
            </div>

            {/* Category Filter */}
            <Card className="bg-white mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter by Exam</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">⏱️</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Timed Tests</h3>
                    <p className="text-gray-600 text-sm">Real exam timer with auto-submission</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-white p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">📊</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Instant Results</h3>
                    <p className="text-gray-600 text-sm">Detailed analysis immediately after submission</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-white p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Performance Tracking</h3>
                    <p className="text-gray-600 text-sm">Track progress over time with analytics</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Test List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTests.map((test) => (
                <Card key={test.id} className="bg-white hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                      {test.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{test.title}</h3>
                  <p className="text-gray-600 mb-4">{test.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold text-gray-900">{test.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Questions</div>
                      <div className="font-semibold text-gray-900">{test.questions}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Marks</div>
                      <div className="font-semibold text-gray-900">{test.marks}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>👥 {test.attempts} attempts</span>
                      <span>⭐ {test.rating}</span>
                    </div>
                    <Button
                      onClick={() => handleStartTest(test.id)}
                      variant="primary"
                      size="sm"
                    >
                      Start Test
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Coming Soon Section */}
            <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-8 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-3">🚀 More Tests Coming Soon!</h2>
                <p className="text-purple-100 mb-4">
                  We're adding chapter-wise tests, previous year papers, and custom practice sets
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="secondary" size="sm">Request a Test</Button>
                  <Button variant="outline" size="sm">View Test Series</Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MockTests;
