import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAchievementTracker from '../hooks/useAchievementTracker';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const StudyMaterials = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackAction } = useAchievementTracker(user);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadStats, setDownloadStats] = useState({ count: 0 });
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const categories = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'General', 'Computer Science', 'Aptitude', 'Reasoning'];

  const materials = [
    // Physics Materials
    {
      id: 1,
      title: 'Complete Physics Formula Sheet',
      category: 'Physics',
      type: 'PDF',
      size: '2.5 MB',
      downloads: 1250,
      rating: 4.8,
      description: 'All important physics formulas for JEE/NEET',
      tags: ['Formulas', 'Quick Revision', 'Important'],
      downloadUrl: 'https://drive.google.com/file/d/physics-formula-sheet.pdf'
    },
    {
      id: 9,
      title: 'Thermodynamics Solved Problems',
      category: 'Physics',
      type: 'PDF',
      size: '6.7 MB',
      downloads: 1120,
      rating: 4.8,
      description: '100+ solved thermodynamics problems',
      tags: ['Thermodynamics', 'Problems', 'Solutions'],
      downloadUrl: 'https://drive.google.com/file/d/thermodynamics-problems.pdf'
    },
    {
      id: 6,
      title: 'Electrostatics Concept Builder',
      category: 'Physics',
      type: 'Interactive',
      size: '25 MB',
      downloads: 654,
      rating: 4.8,
      description: 'Interactive simulations for electrostatics',
      tags: ['Electricity', 'Simulation', 'Visual'],
      downloadUrl: 'https://phet.colorado.edu/sims/html/electric-field-hockey/latest/electric-field-hockey_en.html'
    },
    {
      id: 11,
      title: 'Optics Complete Guide',
      category: 'Physics',
      type: 'PDF',
      size: '8.9 MB',
      downloads: 890,
      rating: 4.7,
      description: 'Ray optics and wave optics complete notes',
      tags: ['Optics', 'Light', 'Complete Guide'],
      downloadUrl: 'https://drive.google.com/file/d/optics-complete-guide.pdf'
    },
    {
      id: 12,
      title: 'Mechanics Shortcut Methods',
      category: 'Physics',
      type: 'Video',
      size: '256 MB',
      downloads: 1340,
      rating: 4.9,
      description: 'Time-saving tricks for mechanics problems',
      tags: ['Mechanics', 'Shortcuts', 'JEE Advanced'],
      downloadUrl: 'https://www.youtube.com/watch?v=mechanics-shortcuts'
    },
    
    // Chemistry Materials
    {
      id: 2,
      title: 'Organic Chemistry Reaction Mechanisms',
      category: 'Chemistry',
      type: 'PDF',
      size: '5.8 MB',
      downloads: 980,
      rating: 4.9,
      description: 'Comprehensive guide to organic reactions',
      tags: ['Organic', 'Reactions', 'Mechanism'],
      downloadUrl: 'https://drive.google.com/file/d/organic-chemistry-mechanisms.pdf'
    },
    {
      id: 7,
      title: 'Chemical Bonding Mind Map',
      category: 'Chemistry',
      type: 'Image',
      size: '1.2 MB',
      downloads: 1890,
      rating: 4.7,
      description: 'Visual mind map for chemical bonding concepts',
      tags: ['Bonding', 'Mind Map', 'Quick Review'],
      downloadUrl: 'https://drive.google.com/file/d/chemical-bonding-mindmap.png'
    },
    {
      id: 13,
      title: 'Inorganic Chemistry Complete Notes',
      category: 'Chemistry',
      type: 'PDF',
      size: '12.3 MB',
      downloads: 1560,
      rating: 4.8,
      description: 'Coordination compounds, p-block, d-block elements',
      tags: ['Inorganic', 'Complete Notes', 'Important'],
      downloadUrl: 'https://drive.google.com/file/d/inorganic-chemistry-complete.pdf'
    },
    {
      id: 14,
      title: 'Physical Chemistry Formulas',
      category: 'Chemistry',
      type: 'PDF',
      size: '3.2 MB',
      downloads: 1120,
      rating: 4.6,
      description: 'All physical chemistry formulas and equations',
      tags: ['Physical', 'Formulas', 'Quick Reference'],
      downloadUrl: 'https://drive.google.com/file/d/physical-chemistry-formulas.pdf'
    },
    {
      id: 15,
      title: 'Named Reactions in Organic Chemistry',
      category: 'Chemistry',
      type: 'PDF',
      size: '4.5 MB',
      downloads: 2340,
      rating: 4.9,
      description: 'All named reactions with mechanisms for exams',
      tags: ['Organic', 'Named Reactions', 'Must Know'],
      downloadUrl: 'https://drive.google.com/file/d/named-reactions-organic.pdf'
    },
    
    // Mathematics Materials
    {
      id: 3,
      title: 'Calculus Complete Notes',
      category: 'Mathematics',
      type: 'PDF',
      size: '8.2 MB',
      downloads: 1560,
      rating: 4.7,
      description: 'Full calculus coverage with solved examples',
      tags: ['Calculus', 'Notes', 'Examples'],
      downloadUrl: 'https://drive.google.com/file/d/calculus-complete-notes.pdf'
    },
    {
      id: 5,
      title: 'Quadratic Equations Shortcuts',
      category: 'Mathematics',
      type: 'Video',
      size: '145 MB',
      downloads: 2100,
      rating: 4.9,
      description: 'Time-saving tricks for quadratic equations',
      tags: ['Algebra', 'Shortcuts', 'Quick Solve'],
      downloadUrl: 'https://www.youtube.com/watch?v=quadratic-shortcuts'
    },
    {
      id: 10,
      title: 'Coordinate Geometry Formulas',
      category: 'Mathematics',
      type: 'PDF',
      size: '2.1 MB',
      downloads: 1450,
      rating: 4.6,
      description: 'Essential coordinate geometry formulas',
      tags: ['Geometry', 'Formulas', 'Important'],
      downloadUrl: 'https://drive.google.com/file/d/coordinate-geometry-formulas.pdf'
    },
    {
      id: 16,
      title: 'Matrices and Determinants Guide',
      category: 'Mathematics',
      type: 'PDF',
      size: '5.6 MB',
      downloads: 980,
      rating: 4.7,
      description: 'Complete guide to matrices and determinants',
      tags: ['Matrices', 'Determinants', 'Linear Algebra'],
      downloadUrl: 'https://drive.google.com/file/d/matrices-determinants.pdf'
    },
    {
      id: 17,
      title: 'Probability Complete Course',
      category: 'Mathematics',
      type: 'PDF',
      size: '7.8 MB',
      downloads: 1230,
      rating: 4.8,
      description: 'From basics to advanced probability concepts',
      tags: ['Probability', 'Statistics', 'Complete Course'],
      downloadUrl: 'https://drive.google.com/file/d/probability-complete-course.pdf'
    },
    {
      id: 18,
      title: 'Vector Algebra Mastery',
      category: 'Mathematics',
      type: 'PDF',
      size: '4.3 MB',
      downloads: 890,
      rating: 4.6,
      description: 'Master vector algebra with solved problems',
      tags: ['Vectors', '3D Geometry', 'Advanced'],
      downloadUrl: 'https://drive.google.com/file/d/vector-algebra-mastery.pdf'
    },
    
    // Biology Materials
    {
      id: 4,
      title: 'Biology Diagrams Collection',
      category: 'Biology',
      type: 'PDF',
      size: '12.5 MB',
      downloads: 875,
      rating: 4.6,
      description: 'All important biology diagrams with labels',
      tags: ['Diagrams', 'Botany', 'Zoology'],
      downloadUrl: 'https://drive.google.com/file/d/biology-diagrams-collection.pdf'
    },
    {
      id: 19,
      title: 'Human Physiology Complete Notes',
      category: 'Biology',
      type: 'PDF',
      size: '15.6 MB',
      downloads: 1450,
      rating: 4.9,
      description: 'Complete human physiology for NEET',
      tags: ['Physiology', 'Human Body', 'NEET'],
      downloadUrl: 'https://drive.google.com/file/d/human-physiology-notes.pdf'
    },
    {
      id: 20,
      title: 'Genetics and Evolution Guide',
      category: 'Biology',
      type: 'PDF',
      size: '9.2 MB',
      downloads: 1120,
      rating: 4.8,
      description: 'Complete genetics and evolution chapter',
      tags: ['Genetics', 'Evolution', 'Important'],
      downloadUrl: 'https://drive.google.com/file/d/genetics-evolution-guide.pdf'
    },
    {
      id: 21,
      title: 'Plant Kingdom Classification',
      category: 'Biology',
      type: 'PDF',
      size: '6.7 MB',
      downloads: 780,
      rating: 4.5,
      description: 'Complete plant kingdom classification notes',
      tags: ['Botany', 'Classification', 'Plant Kingdom'],
      downloadUrl: 'https://drive.google.com/file/d/plant-kingdom-classification.pdf'
    },
    
    // Computer Science Materials
    {
      id: 22,
      title: 'Python Programming Basics',
      category: 'Computer Science',
      type: 'PDF',
      size: '8.9 MB',
      downloads: 2340,
      rating: 4.9,
      description: 'Learn Python from scratch with examples',
      tags: ['Python', 'Programming', 'Beginner'],
      downloadUrl: 'https://drive.google.com/file/d/python-programming-basics.pdf'
    },
    {
      id: 23,
      title: 'Data Structures Complete Guide',
      category: 'Computer Science',
      type: 'PDF',
      size: '12.4 MB',
      downloads: 1890,
      rating: 4.8,
      description: 'Arrays, linked lists, trees, graphs explained',
      tags: ['DSA', 'Algorithms', 'Coding'],
      downloadUrl: 'https://drive.google.com/file/d/data-structures-complete.pdf'
    },
    {
      id: 24,
      title: 'Database Management Systems',
      category: 'Computer Science',
      type: 'PDF',
      size: '7.6 MB',
      downloads: 1230,
      rating: 4.7,
      description: 'SQL, normalization, transactions covered',
      tags: ['DBMS', 'SQL', 'Database'],
      downloadUrl: 'https://drive.google.com/file/d/dbms-complete-guide.pdf'
    },
    {
      id: 25,
      title: 'Operating Systems Concepts',
      category: 'Computer Science',
      type: 'PDF',
      size: '10.2 MB',
      downloads: 980,
      rating: 4.6,
      description: 'Process management, memory, file systems',
      tags: ['OS', 'Operating Systems', 'Core CS'],
      downloadUrl: 'https://drive.google.com/file/d/operating-systems-concepts.pdf'
    },
    
    // Aptitude & Reasoning Materials
    {
      id: 26,
      title: 'Quantitative Aptitude Shortcuts',
      category: 'Aptitude',
      type: 'PDF',
      size: '6.8 MB',
      downloads: 3450,
      rating: 4.9,
      description: 'Speed math techniques for competitive exams',
      tags: ['Quant', 'Aptitude', 'Shortcuts'],
      downloadUrl: 'https://drive.google.com/file/d/quant-aptitude-shortcuts.pdf'
    },
    {
      id: 27,
      title: 'Logical Reasoning Complete Course',
      category: 'Reasoning',
      type: 'PDF',
      size: '9.5 MB',
      downloads: 2890,
      rating: 4.8,
      description: 'Puzzles, seating arrangement, blood relations',
      tags: ['Reasoning', 'Logical', 'Puzzles'],
      downloadUrl: 'https://drive.google.com/file/d/logical-reasoning-complete.pdf'
    },
    {
      id: 28,
      title: 'Verbal Ability Guide',
      category: 'English',
      type: 'PDF',
      size: '5.4 MB',
      downloads: 1670,
      rating: 4.7,
      description: 'Grammar, vocabulary, sentence improvement',
      tags: ['English', 'Verbal', 'Grammar'],
      downloadUrl: 'https://drive.google.com/file/d/verbal-ability-guide.pdf'
    },
    
    // General Study Materials
    {
      id: 8,
      title: 'Reading Comprehension Strategies',
      category: 'English',
      type: 'PDF',
      size: '3.4 MB',
      downloads: 756,
      rating: 4.5,
      description: 'Techniques to ace reading comprehension',
      tags: ['English', 'RC', 'Tips'],
      downloadUrl: 'https://drive.google.com/file/d/reading-comprehension-strategies.pdf'
    },
    {
      id: 29,
      title: 'Time Management for Exams',
      category: 'General',
      type: 'PDF',
      size: '2.8 MB',
      downloads: 2120,
      rating: 4.8,
      description: 'Study planning and time management tips',
      tags: ['Time Management', 'Study Tips', 'Productivity'],
      downloadUrl: 'https://drive.google.com/file/d/time-management-exams.pdf'
    },
    {
      id: 30,
      title: 'Exam Stress Management Guide',
      category: 'General',
      type: 'PDF',
      size: '3.1 MB',
      downloads: 1890,
      rating: 4.9,
      description: 'Mental health and stress management techniques',
      tags: ['Mental Health', 'Stress', 'Wellness'],
      downloadUrl: 'https://drive.google.com/file/d/stress-management-guide.pdf'
    }
  ];

  const handleDownload = (material) => {
    // Open information page/modal first
    setSelectedMaterial(material);
    setIsInfoModalOpen(true);
  };

  const handleConfirmDownload = async () => {
    if (!selectedMaterial) return;
    
    if (user) {
      await trackAction('MATERIAL_DOWNLOADED', { 
        materialId: selectedMaterial.id,
        materialTitle: selectedMaterial.title,
        downloadCount: downloadStats.count + 1 
      });
      setDownloadStats(prev => ({ count: prev.count + 1 }));
    }
    
    // Generate and show the PDF info cover sheet first
    generateCoverSheet(selectedMaterial);
    
    // Then trigger the actual download after a short delay
    setTimeout(() => {
      if (selectedMaterial.downloadUrl) {
        try {
          // For Google Drive links, open in new tab
          if (selectedMaterial.downloadUrl.includes('drive.google.com')) {
            window.open(selectedMaterial.downloadUrl, '_blank');
          } else if (selectedMaterial.downloadUrl.includes('youtube.com')) {
            // For YouTube videos, open in new tab
            window.open(selectedMaterial.downloadUrl, '_blank');
          } else {
            // For direct file downloads
            const link = document.createElement('a');
            link.href = selectedMaterial.downloadUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
          
          console.log('Download initiated:', selectedMaterial.title);
          setIsInfoModalOpen(false);
          
          // Show success message
          alert(`✅ Download Started!\n\n📄 ${selectedMaterial.title}\n📊 Size: ${selectedMaterial.size}\n\nA cover sheet with material details has been generated for your reference.`);
        } catch (error) {
          console.error('Download error:', error);
          alert('Download failed. Please try again or contact support.');
        }
      }
    }, 1500); // 1.5 second delay to show the cover sheet
  };

  const generateCoverSheet = (material) => {
    // Create a printable cover sheet
    const coverSheetContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${material.title} - Study Material</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
          .title { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .category { display: inline-block; background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; margin-right: 10px; }
          .type { display: inline-block; background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; }
          .info-box { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .section { margin: 25px 0; }
          .section-title { font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 10px; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
          .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 15px 0; }
          .detail-item { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
          .detail-label { font-size: 12px; color: #666; text-transform: uppercase; }
          .detail-value { font-size: 16px; font-weight: bold; color: #333; margin-top: 5px; }
          .features { list-style: none; padding: 0; }
          .features li { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .features li:before { content: "✓ "; color: #10b981; font-weight: bold; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #666; font-size: 14px; }
          .watermark { position: fixed; bottom: 20px; right: 20px; opacity: 0.3; font-size: 48px; color: #667eea; transform: rotate(-45deg); }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">📚 ${material.title}</div>
          <div>
            <span class="category">${material.category}</span>
            <span class="type">${material.type}</span>
          </div>
        </div>

        <div class="info-box">
          <div class="section-title">📋 Material Information</div>
          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-label">Category</div>
              <div class="detail-value">${material.category}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Type</div>
              <div class="detail-value">${material.type}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">File Size</div>
              <div class="detail-value">${material.size}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Downloads</div>
              <div class="detail-value">${material.downloads.toLocaleString()}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Rating</div>
              <div class="detail-value">⭐ ${material.rating}/5.0</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Downloaded On</div>
              <div class="detail-value">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📖 Description</div>
          <p style="line-height: 1.6; color: #4b5563;">${material.description}</p>
        </div>

        <div class="section">
          <div class="section-title">✨ Key Features</div>
          <ul class="features">
            ${material.tags.map(tag => `<li>${tag}</li>`).join('')}
          </ul>
        </div>

        <div class="section">
          <div class="section-title">🎯 What You'll Learn</div>
          <ul style="line-height: 1.8; color: #4b5563;">
            <li>Comprehensive coverage of ${material.category} concepts</li>
            <li>Detailed explanations and examples</li>
            <li>Exam-oriented approach for competitive tests</li>
            <li>Quick revision notes and key points</li>
            <li>Practice problems and solutions</li>
          </ul>
        </div>

        <div class="section">
          <div class="section-title">💡 How to Use This Material</div>
          <ol style="line-height: 2; color: #4b5563;">
            <li>Read through the entire material once</li>
            <li>Make notes of important formulas and concepts</li>
            <li>Practice all solved examples</li>
            <li>Attempt practice problems on your own</li>
            <li>Revise regularly using this material</li>
            <li>Bookmark difficult topics for review</li>
          </ol>
        </div>

        <div class="section">
          <div class="section-title">🏷️ Topics Covered</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${material.tags.map(tag => `<span style="background: #e5e7eb; padding: 5px 12px; border-radius: 15px; font-size: 13px;">${tag}</span>`).join('')}
          </div>
        </div>

        <div class="footer">
          <p><strong>Future Forge - Career Counselling Platform</strong></p>
          <p>Your one-stop solution for career guidance, exam preparation, and college admissions</p>
          <p style="margin-top: 10px; font-size: 12px;">Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        <div class="watermark">FUTURE FORGE</div>
      </body>
      </html>
    `;

    // Open the cover sheet in a new window for printing/saving
    const printWindow = window.open('', '_blank');
    printWindow.document.write(coverSheetContent);
    printWindow.document.close();
    
    // Auto-trigger print dialog after a short delay
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">📚 Study Materials</h1>
              <p className="text-xl text-gray-600">Free resources to boost your preparation across all subjects</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-indigo-600">{materials.length}</div>
                <div className="text-gray-600 mt-1">Resources</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-teal-600">{downloadStats.count + 12640}</div>
                <div className="text-gray-600 mt-1">Total Downloads</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-purple-600">4.7</div>
                <div className="text-gray-600 mt-1">Avg Rating</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-600 mt-1">Free</div>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card className="bg-white mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <input
                    type="text"
                    placeholder="🔍 Search materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-gray-700">Filter:</span>
                  {categories.slice(0, 6).map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedCategory === category
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Material Types */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card className="bg-white p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">📄</div>
                <div className="font-semibold">PDFs</div>
                <div className="text-sm text-gray-600">Study notes & guides</div>
              </Card>
              <Card className="bg-white p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">🎥</div>
                <div className="font-semibold">Videos</div>
                <div className="text-sm text-gray-600">Concept explanations</div>
              </Card>
              <Card className="bg-white p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">🖼️</div>
                <div className="font-semibold">Images</div>
                <div className="text-sm text-gray-600">Diagrams & maps</div>
              </Card>
              <Card className="bg-white p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">💻</div>
                <div className="font-semibold">Interactive</div>
                <div className="text-sm text-gray-600">Simulations & tools</div>
              </Card>
              <Card className="bg-white p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold">Aptitude</div>
                <div className="text-sm text-gray-600">Reasoning & quant</div>
              </Card>
            </div>

            {/* Materials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="bg-white hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                      {material.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                      {material.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{material.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{material.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {material.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>💾 {material.size}</span>
                    <span>⬇️ {material.downloads}</span>
                    <span>⭐ {material.rating}</span>
                  </div>
                  
                  <Button
                    onClick={() => handleDownload(material)}
                    variant="primary"
                    className="w-full"
                  >
                    📥 Download Now
                  </Button>
                </Card>
              ))}
            </div>

            {/* Upload Request */}
            <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white mt-8 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-3">📤 Request Study Material</h2>
                <p className="text-blue-100 mb-4">
                  Can't find what you're looking for? Request specific topics or subjects!
                </p>
                <Button variant="secondary" size="sm">Request Material</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Material Information Modal */}
      {isInfoModalOpen && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white bg-opacity-20 text-xs font-medium rounded-full">
                      {selectedMaterial.category}
                    </span>
                    <span className="px-3 py-1 bg-white bg-opacity-20 text-xs font-medium rounded-full">
                      {selectedMaterial.type}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedMaterial.title}</h2>
                </div>
                <button
                  onClick={() => setIsInfoModalOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📖 Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedMaterial.description}</p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">✨ Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedMaterial.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <span className="text-indigo-600">✓</span>
                      <span className="text-gray-700">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Details */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">📊 File Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-blue-700">File Size</div>
                    <div className="text-lg font-semibold text-blue-900">{selectedMaterial.size}</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">Downloads</div>
                    <div className="text-lg font-semibold text-blue-900">{selectedMaterial.downloads}</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">Rating</div>
                    <div className="text-lg font-semibold text-blue-900">⭐ {selectedMaterial.rating}/5.0</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-700">Format</div>
                    <div className="text-lg font-semibold text-blue-900">{selectedMaterial.type}</div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-3">🎯 What You'll Get</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">➤</span>
                    <span>High-quality study material prepared by experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">➤</span>
                    <span>Comprehensive coverage of {selectedMaterial.category} topics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">➤</span>
                    <span>Perfect for exam preparation and quick revision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">➤</span>
                    <span>Downloadable format for offline access</span>
                  </li>
                </ul>
              </div>

              {/* Usage Tips */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">💡 How to Use</h3>
                <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                  <li>Download the material to your device</li>
                  <li>Review the content thoroughly</li>
                  <li>Practice with included examples and problems</li>
                  <li>Use for quick revision before exams</li>
                  <li>Bookmark important sections for easy reference</li>
                </ol>
              </div>

              {/* Related Topics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMaterial.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  onClick={handleConfirmDownload}
                  variant="primary"
                  className="flex-1 text-lg py-3"
                >
                  📥 Download Now - {selectedMaterial.size}
                </Button>
                <Button
                  onClick={() => setIsInfoModalOpen(false)}
                  variant="secondary"
                  className="flex-1 text-lg py-3"
                >
                  Cancel
                </Button>
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>✅ 100% Free Resource • ✅ Verified Quality • ✅ Trusted by Thousands</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
