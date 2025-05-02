
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Lightbulb, Video, FileText, Users, Crown, School } from "lucide-react";

export default function ParentZonePage() {
  const { t } = useLanguage();
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [selectedGrade, setSelectedGrade] = useState<"all" | "10th" | "12th">("all");
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value as "english" | "hindi");
  };

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value as "all" | "10th" | "12th");
  };
  
  const resources = {
    english: [
      {
        title: "Understanding Modern Careers",
        description: "A guide to help parents understand new-age career options beyond traditional paths.",
        icon: <Lightbulb className="h-5 w-5" />,
        grade: "all"
      },
      {
        title: "Supporting Your Child's Career Journey",
        description: "Practical advice on how to support and guide your child without imposing your preferences.",
        icon: <Users className="h-5 w-5" />,
        grade: "all"
      },
      {
        title: "Digital Careers Explained",
        description: "Detailed explanations of careers in technology, digital marketing, and other emerging fields.",
        icon: <BookOpen className="h-5 w-5" />,
        grade: "all"
      },
      {
        title: "Entrance Exam Preparation Guide",
        description: "How to help your child prepare for various entrance exams without adding pressure.",
        icon: <School className="h-5 w-5" />,
        grade: "12th"
      },
      {
        title: "Stream Selection After 10th",
        description: "Guidance on helping your child choose the right academic stream after completing 10th grade.",
        icon: <School className="h-5 w-5" />,
        grade: "10th"
      },
      {
        title: "Developing Skills in 10th Grade",
        description: "Essential skills that 10th grade students should develop for future career success.",
        icon: <Lightbulb className="h-5 w-5" />,
        grade: "10th"
      }
    ],
    hindi: [
      {
        title: "आधुनिक करियर को समझना",
        description: "पारंपरिक मार्गों से परे नए युग के करियर विकल्पों को समझने में माता-पिता की सहायता के लिए एक गाइड।",
        icon: <Lightbulb className="h-5 w-5" />,
        grade: "all"
      },
      {
        title: "अपने बच्चे की करियर यात्रा का समर्थन करना",
        description: "अपनी प्राथमिकताओं को थोपे बिना अपने बच्चे का समर्थन और मार्गदर्शन करने के बारे में व्यावहारिक सलाह।",
        icon: <Users className="h-5 w-5" />,
        grade: "all"
      },
      {
        title: "डिजिटल करियर की व्याख्या",
        description: "प्रौद्योगिकी, डिजिटल मार्केटिंग, और अन्य उभरते क्षेत्रों में करियर का विस्तृत विवरण।",
        icon: <BookOpen className="h-5 w-5" />,
        grade: "all"
      },
      {
        title: "प्रवेश परीक्षा तैयारी गाइड",
        description: "बिना दबाव डाले अपने बच्चे को विभिन्न प्रवेश परीक्षाओं की तैयारी करने में कैसे मदद करें।",
        icon: <School className="h-5 w-5" />,
        grade: "12th"
      },
      {
        title: "दसवीं के बाद स्ट्रीम चयन",
        description: "दसवीं कक्षा पूरी करने के बाद अपने बच्चे को सही शैक्षिक धारा चुनने में मदद करने के लिए मार्गदर्शन।",
        icon: <School className="h-5 w-5" />,
        grade: "10th"
      },
      {
        title: "दसवीं कक्षा में कौशल विकास",
        description: "आवश्यक कौशल जो 10वीं कक्षा के छात्रों को भविष्य की करियर सफलता के लिए विकसित करना चाहिए।",
        icon: <Lightbulb className="h-5 w-5" />,
        grade: "10th"
      }
    ]
  };
  
  const videos = {
    english: [
      {
        title: "What is UI/UX Design?",
        description: "A simple explanation of what UI/UX designers do and the career prospects in this field.",
        duration: "5:45",
        grade: "12th"
      },
      {
        title: "Understanding Data Science",
        description: "Breaking down the complex field of data science into simple concepts for parents.",
        duration: "7:20",
        grade: "12th"
      },
      {
        title: "Career Opportunities After 12th Science",
        description: "Exploring options beyond engineering and medicine for science students.",
        duration: "10:15",
        grade: "12th"
      },
      {
        title: "Stream Selection After 10th",
        description: "How to help your child choose between Science, Commerce, Arts or Vocational streams.",
        duration: "8:35",
        grade: "10th"
      },
      {
        title: "Building a Foundation in 10th",
        description: "Important skills and knowledge areas to focus on during 10th grade.",
        duration: "6:20",
        grade: "10th"
      }
    ],
    hindi: [
      {
        title: "UI/UX डिज़ाइन क्या है?",
        description: "UI/UX डिज़ाइनर क्या करते हैं और इस क्षेत्र में करियर संभावनाओं का एक सरल स्पष्टीकरण।",
        duration: "5:45",
        grade: "12th"
      },
      {
        title: "डेटा साइंस को समझना",
        description: "माता-पिता के लिए डेटा साइंस के जटिल क्षेत्र को सरल अवधारणाओं में तोड़ना।",
        duration: "7:20",
        grade: "12th"
      },
      {
        title: "12वीं विज्ञान के बाद करियर के अवसर",
        description: "विज्ञान के छात्रों के लिए इंजीनियरिंग और चिकित्सा से परे विकल्पों का अन्वेषण।",
        duration: "10:15",
        grade: "12th"
      },
      {
        title: "10वीं के बाद स्ट्रीम चयन",
        description: "अपने बच्चे को विज्ञान, वाणिज्य, कला या व्यावसायिक धाराओं के बीच चयन करने में कैसे मदद करें।",
        duration: "8:35",
        grade: "10th"
      },
      {
        title: "10वीं में नींव बनाना",
        description: "10वीं कक्षा के दौरान ध्यान केंद्रित करने के लिए महत्वपूर्ण कौशल और ज्ञान क्षेत्र।",
        duration: "6:20",
        grade: "10th"
      }
    ]
  };
  
  const faqs = {
    english: [
      {
        question: "How can I help my child choose the right career?",
        answer: "Listen to their interests, help them explore options, arrange meetings with professionals, and focus on their strengths rather than imposing your choices.",
        grade: "all"
      },
      {
        question: "Are non-traditional careers stable and secure?",
        answer: "Many new-age careers are not only stable but often offer better growth potential and work-life balance than traditional paths. The key is gaining the right skills and staying adaptable.",
        grade: "all"
      },
      {
        question: "What if my child wants to change their career path later?",
        answer: "Career changes are increasingly common and accepted. Focus on transferable skills and encourage adaptability rather than viewing a change as a 'waste' of earlier education.",
        grade: "all"
      },
      {
        question: "What are the best streams for a 10th-grade student to choose?",
        answer: "The best stream depends on your child's interests, aptitude, and future career goals. Instead of focusing only on popular choices, consider what subjects they enjoy and excel at naturally.",
        grade: "10th"
      },
      {
        question: "How important are board exam results for 10th-grade students?",
        answer: "While important, 10th-grade results are not the only factor determining future success. They help in stream selection but should be balanced with developing practical skills and exploring interests.",
        grade: "10th"
      }
    ],
    hindi: [
      {
        question: "मैं अपने बच्चे को सही करियर चुनने में कैसे मदद कर सकता हूं?",
        answer: "उनकी रुचियों को सुनें, उन्हें विकल्पों का अन्वेषण करने में मदद करें, पेशेवरों के साथ बैठक की व्यवस्था करें, और अपने विकल्पों को थोपने के बजाय उनकी ताकतों पर ध्यान केंद्रित करें।",
        grade: "all"
      },
      {
        question: "क्या गैर-पारंपरिक करियर स्थिर और सुरक्षित हैं?",
        answer: "कई नए युग के करियर न केवल स्थिर हैं बल्कि अक्सर पारंपरिक रास्तों की तुलना में बेहतर विकास क्षमता और काम-जीवन संतुलन प्रदान करते हैं। मुख्य बात सही कौशल हासिल करना और अनुकूलनशील रहना है।",
        grade: "all"
      },
      {
        question: "क्या होगा अगर मेरा बच्चा बाद में अपना करियर पथ बदलना चाहता है?",
        answer: "करियर परिवर्तन तेजी से आम और स्वीकृत हो रहे हैं। पहले की शिक्षा को 'बर्बाद' मानने के बजाय हस्तांतरणीय कौशल पर ध्यान केंद्रित करें और अनुकूलनशीलता को प्रोत्साहित करें।",
        grade: "all"
      },
      {
        question: "10वीं कक्षा के छात्र के लिए सबसे अच्छी स्ट्रीम कौन सी हैं?",
        answer: "सबसे अच्छी स्ट्रीम आपके बच्चे की रुचियों, योग्यता और भविष्य के करियर लक्ष्यों पर निर्भर करती है। केवल लोकप्रिय विकल्पों पर ध्यान केंद्रित करने के बजाय, विचार करें कि वे किन विषयों का आनंद लेते हैं और स्वाभाविक रूप से उत्कृष्ट हैं।",
        grade: "10th"
      },
      {
        question: "10वीं कक्षा के छात्रों के लिए बोर्ड परीक्षा के परिणाम कितने महत्वपूर्ण हैं?",
        answer: "महत्वपूर्ण होने के साथ-साथ, 10वीं कक्षा के परिणाम भविष्य की सफलता निर्धारित करने वाले एकमात्र कारक नहीं हैं। वे स्ट्रीम चयन में मदद करते हैं लेकिन व्यावहारिक कौशल विकसित करने और रुचियों का पता लगाने के साथ संतुलित होना चाहिए।",
        grade: "10th"
      }
    ]
  };

  const filteredResources = resources[language].filter(resource => 
    selectedGrade === "all" || resource.grade === "all" || resource.grade === selectedGrade
  );

  const filteredVideos = videos[language].filter(video => 
    selectedGrade === "all" || video.grade === "all" || video.grade === selectedGrade
  );

  const filteredFaqs = faqs[language].filter(faq => 
    selectedGrade === "all" || faq.grade === "all" || faq.grade === selectedGrade
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-pp-purple to-purple-600 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {language === "english" ? "Parent Zone" : "पेरेंट ज़ोन"}
              </h1>
              <p className="text-white/90 text-lg max-w-3xl mx-auto">
                {language === "english" 
                  ? "Resources and guidance for parents to understand and support their children's educational and career journey."
                  : "माता-पिता के लिए संसाधन और मार्गदर्शन ताकि वे अपने बच्चों की शैक्षिक और करियर यात्रा को समझ और समर्थन कर सकें।"
                }
              </p>
              
              <div className="mt-6 inline-block">
                <Tabs 
                  defaultValue="english" 
                  value={language}
                  onValueChange={handleLanguageChange} 
                  className="bg-white/20 backdrop-blur-sm rounded-full p-1"
                >
                  <TabsList className="grid grid-cols-2 bg-transparent">
                    <TabsTrigger 
                      value="english"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:text-pp-purple"
                    >
                      English
                    </TabsTrigger>
                    <TabsTrigger 
                      value="hindi"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:text-pp-purple"
                    >
                      हिंदी
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="mt-4 inline-block">
                <Tabs 
                  defaultValue="all" 
                  value={selectedGrade}
                  onValueChange={handleGradeChange} 
                  className="bg-white/20 backdrop-blur-sm rounded-full p-1"
                >
                  <TabsList className="grid grid-cols-3 bg-transparent">
                    <TabsTrigger 
                      value="all"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:text-pp-purple"
                    >
                      {language === "english" ? "All Grades" : "सभी कक्षाएँ"}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="10th"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:text-pp-purple"
                    >
                      {language === "english" ? "10th Grade" : "दसवीं कक्षा"}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="12th"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:text-pp-purple"
                    >
                      {language === "english" ? "12th Grade" : "बारहवीं कक्षा"}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Resources section */}
        <section className="py-12 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === "english" ? "Resources for Parents" : "माता-पिता के लिए संसाधन"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === "english" 
                  ? "Guides and articles to help you understand modern careers and support your child's journey."
                  : "आधुनिक करियर को समझने और अपने बच्चे की यात्रा का समर्थन करने में आपकी मदद के लिए गाइड और लेख।"
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 rounded-full bg-pp-purple/10 flex items-center justify-center mb-2">
                        {resource.icon}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Button 
                          variant="link" 
                          className="p-0 text-pp-purple dark:text-pp-bright-purple"
                        >
                          {language === "english" ? "Read more" : "अधिक पढ़ें"}
                        </Button>
                        
                        {resource.grade === "10th" && (
                          <span className="bg-pp-purple/10 text-pp-purple text-xs px-2 py-1 rounded-full">
                            {language === "english" ? "10th Grade" : "10वीं"}
                          </span>
                        )}
                        
                        {resource.grade === "12th" && (
                          <span className="bg-pp-saffron/10 text-pp-saffron text-xs px-2 py-1 rounded-full">
                            {language === "english" ? "12th Grade" : "12वीं"}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Video resources */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded-full bg-pp-purple/10 flex items-center justify-center mx-auto mb-3">
                <Video className="h-6 w-6 text-pp-purple" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === "english" ? "Video Explainers" : "वीडियो व्याख्या"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === "english" 
                  ? "Simple, easy-to-understand videos that explain modern careers for parents."
                  : "माता-पिता के लिए आधुनिक करियर की व्याख्या करने वाले सरल, आसानी से समझने योग्य वीडियो।"
                }
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="w-16 h-16 rounded-full bg-pp-purple/90 hover:bg-pp-purple text-white"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-8 h-8 ml-1"
                      >
                        <path 
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" 
                        />
                      </svg>
                    </Button>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {video.grade && (
                      <div className={`absolute top-2 left-2 ${
                        video.grade === "10th" ? "bg-pp-purple/80" : "bg-pp-saffron/80"
                      } text-white text-xs px-2 py-1 rounded-full`}>
                        {language === "english" ? `${video.grade} Grade` : video.grade === "10th" ? "10वीं" : "12वीं"}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">{video.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{video.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded-full bg-pp-purple/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-pp-purple" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === "english" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === "english" 
                  ? "Common questions parents have about their children's education and career choices."
                  : "माता-पिता के अपने बच्चों की शिक्षा और करियर विकल्पों के बारे में सामान्य प्रश्न।"
                }
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    {faq.grade === "10th" && (
                      <span className="bg-pp-purple/10 text-pp-purple text-xs px-2 py-1 rounded-full h-fit">
                        {language === "english" ? "10th Grade" : "10वीं"}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                className="bg-pp-purple hover:bg-pp-bright-purple"
              >
                {language === "english" ? "View All FAQs" : "सभी प्रश्न देखें"}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Parent support section */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-pp-purple/10 flex items-center justify-center mb-4">
                  <Crown className="h-6 w-6 text-pp-purple" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language === "english" ? "Your Role as a Parent" : "माता-पिता के रूप में आपकी भूमिका"}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {language === "english" 
                    ? "As parents, you play a crucial role in your child's career journey. Your guidance, support, and understanding can make a significant difference in helping them make informed choices."
                    : "माता-पिता के रूप में, आप अपने बच्चे की करियर यात्रा में एक महत्वपूर्ण भूमिका निभाते हैं। आपका मार्गदर्शन, समर्थन और समझ उन्हें सूचित विकल्प बनाने में महत्वपूर्ण अंतर ला सकते हैं।"
                  }
                </p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    language === "english" ? "Be open to new career paths" : "नए करियर पथों के लिए खुले रहें",
                    language === "english" ? "Support exploration and discovery" : "अन्वेषण और खोज का समर्थन करें",
                    language === "english" ? "Focus on skills, not just degrees" : "सिर्फ डिग्री नहीं, कौशल पर ध्यान दें",
                    language === "english" ? "Encourage passion alongside practicality" : "व्यावहारिकता के साथ-साथ जुनून को प्रोत्साहित करें"
                  ].map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pp-purple flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className="bg-pp-purple hover:bg-pp-bright-purple"
                >
                  {language === "english" ? "Join Parent Community" : "पेरेंट कम्युनिटी से जुड़ें"}
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                  {language === "english" ? "Schedule a Guidance Session" : "मार्गदर्शन सत्र शेड्यूल करें"}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {language === "english" 
                    ? "Get personalized guidance from our career experts on how to support your child's educational and career journey."
                    : "अपने बच्चे की शैक्षिक और करियर यात्रा का समर्थन कैसे करें, इस पर हमारे करियर विशेषज्ञों से व्यक्तिगत मार्गदर्शन प्राप्त करें।"
                  }
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {language === "english" ? "One-on-One Counseling" : "व्यक्तिगत परामर्श"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {language === "english" ? "45-minute session with a career expert" : "करियर विशेषज्ञ के साथ 45 मिनट का सत्र"}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {language === "english" ? "Parent-Child Joint Session" : "पेरेंट-चाइल्ड संयुक्त सत्र"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {language === "english" ? "60-minute session for better alignment" : "बेहतर समन्वय के लिए 60 मिनट का सत्र"}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {language === "english" ? "Parent Workshop" : "पेरेंट वर्कशॉप"}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {language === "english" ? "Group sessions with other parents" : "अन्य माता-पिता के साथ समूह सत्र"}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-pp-purple hover:bg-pp-bright-purple"
                >
                  {language === "english" ? "Book a Session" : "सत्र बुक करें"}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
