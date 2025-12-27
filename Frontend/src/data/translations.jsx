// Consolidates all translations for the entire application (Nav, Hero, Form, Footer)
export const translations = {
    en: {
        // Nav & Hero Text
        home: 'Home', myFarm: 'My Farm', todo: 'To-Do List', trend: 'Local Trend', feedback: 'Feedback',
        search: 'Search...', websiteLanguage: "Website Language:",
        heroTitle: 'KrishiSakhi', heroSubtitle: '', heroDate: '', heroBtn: 'Helping Farmers to build better',
        voiceInputTitle: "Voice Input", voiceInputSubtitle: "Record your details in your local language.", 
        formHeading: 'Enter the Form Detail', formDetailsHeading: "Farm Details", submitBtn: "Submit",
        footerSchemes: 'Schemes', footerMarketPrices: 'Market Prices', footerContact: 'Contact', footerCopy: '© 2025 KrishiSakhi. All rights reserved.', 
        
        // Form Labels
        locationLabel: "Location", landSizeLabel: "Land Size", cropLabel: "Crop", soilTypeLabel: "Soil Type",
        soilCharacterLabel: "Soil Character", irrigationLabel: "Irrigation Source", sowingLabel: "Sowing Type", 
        sowingDateLabel: "Sowing Date", cropStageLabel: "Crop Stage", problemLabel: "Current Problem", uploadImageLabel: "Upload Image",
        
        // Dropdown Options
        locationOptions: ["Select Location", "Auto-detect GPS", "District A", "District B", "District C"],
        landSizeOptions: ["<1 acre", "1–5 acres", "5+ acres"], cropOptions: ["Wheat", "Rice", "Maize", "Soybean"], 
        soilTypeOptions: ["Sandy", "Clay", "Loamy", "Black"],
        soilCharacterOptions: ["Select Soil Character", "Not Sure", "Black", "Red", "Yellow", "Brown", "High Fertility", "Low Fertility"],
        irrigationOptions: ["Canal", "Tube Well", "Rainfed", "Pond"], sowingOptions: ["Manual", "Machine"],
        cropStageOptions: ["Select Stage", "Seedling", "Vegetative", "Flowering", "Harvesting"],
        problemOptions: ["Select Problem", "Fertilizer Issue", "Irrigation Issue", "Disease", "Pest", "Other"]
    },
    hi: {
        home: 'होम', myFarm: 'मेरा खेत', todo: 'कार्य सूची', trend: 'स्थानीय रुझान', feedback: 'फीडबैक',
        search: 'खोजें...', websiteLanguage: "वेबसाइट भाषा:",
        heroTitle: 'कृषि सखी', heroSubtitle: '', heroDate: '', heroBtn: 'किसानों को बेहतर बनाने में मदद',
        voiceInputTitle: "ध्वनि इनपुट", voiceInputSubtitle: "अपनी जानकारी अपनी स्थानीय भाषा में रिकॉर्ड करें।", 
        formHeading: "फॉर्म विवरण दर्ज करें", formDetailsHeading: "खेत का विवरण", submitBtn: "सबमिट करें",
        footerSchemes: 'योजनाएं', footerMarketPrices: 'बाजार कीमतें', footerContact: 'संपर्क', footerCopy: '© 2025 कृषि सखी। सर्वाधिकार सुरक्षित।',
        
        locationLabel: "स्थान", landSizeLabel: "भूमि का आकार", cropLabel: "फसल", soilTypeLabel: "मिट्टी का प्रकार",
        soilCharacterLabel: "मिट्टी का चरित्र", irrigationLabel: "सिंचाई स्रोत", sowingLabel: "बुवाई प्रकार", 
        sowingDateLabel: "बुवाई की तिथि", cropStageLabel: "फसल का चरण", problemLabel: "वर्तमान समस्या", uploadImageLabel: "छवि अपलोड करें",
        
        locationOptions: ["स्थान चुनें", "ऑटो-डिटेक्ट GPS", "जिला A", "जिला B", "जिला C"],
        landSizeOptions: ["<1 एकड़", "1–5 एकड़", "5+ एकड़"], cropOptions: ["गेहूं", "चावल", "मक्का", "सोयाबीन"], 
        soilTypeOptions: ["रेतीली", "चिकनी", "दोमट", "काली"],
        soilCharacterOptions: ["मिट्टी का चरित्र चुनें", "सुनिश्चित नहीं", "काली", "लाल", "पीली", "भूरी", "उच्च उर्वरता", "कम उर्वरता"],
        irrigationOptions: ["नहर", "ट्यूबवेल", "वर्षा आधारित", "तालाब"], sowingOptions: ["हाथ से", "मशीन से"],
        cropStageOptions: ["चरण चुनें", "पौध", "वनस्पति", "फूल आना", "कटाई"],
        problemOptions: ["समस्या चुनें", "खाद की समस्या", "सिंचाई की समस्या", "रोग", "कीट", "अन्य"]
    },
    pa: {
        home: 'ਮੁੱਖ ਪੰਨਾ', myFarm: 'ਮੇਰਾ ਖੇਤ', todo: 'ਕਰਨ ਵਾਲੀ ਸੂਚੀ', trend: 'ਸਥਾਨਕ ਰੁਝਾਨ', feedback: 'ਫੀਡਬੈਕ',
        search: 'ਖੋਜ...', websiteLanguage: "ਵੈਬਸਾਈਟ ਭਾਸ਼ਾ:",
        heroTitle: 'ਕ੍ਰਿਸ਼ੀ ਸਖੀ', heroSubtitle: '', heroDate: '', heroBtn: 'ਕਿਸਾਨਾਂ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ',
        voiceInputTitle: "ਅਵਾਜ਼ ਇਨਪੁਟ", voiceInputSubtitle: "ਆਪਣੇ ਵੇਰਵੇ ਆਪਣੀ ਸਥਾਨਕ ਭਾਸ਼ਾ ਵਿੱਚ ਰਿਕਾਰਡ ਕਰੋ।", 
        formHeading: "ਫਾਰਮ ਵੇਰਵੇ ਦਰਜ ਕਰੋ", formDetailsHeading: "ਖੇਤ ਦੇ ਵੇਰਵੇ", submitBtn: "ਸਪੁਰਦ ਕਰੋ",
        footerSchemes: 'ਯੋਜਨਾਵਾਂ', footerMarketPrices: 'ਬਜ਼ਾਰ ਕੀਮਤਾਂ', footerContact: 'ਸੰਪਰਕ', footerCopy: '© 2025 ਕ੍ਰਿਸ਼ੀ ਸਖੀ। ਸਭ ਅਧਿਕਾਰ ਰਾਖਵੇਂ।',
        
        locationLabel: "ਟਿਕਾਣਾ", landSizeLabel: "ਜ਼ਮੀਨ ਦਾ ਆਕਾਰ", cropLabel: "ਫ਼ਸਲ", soilTypeLabel: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
        soilCharacterLabel: "ਮਿੱਟੀ ਦਾ ਅੱਖਰ", irrigationLabel: "ਸਿੰਚਾਈ ਸਰੋਤ", sowingLabel: "ਬਿਜਾਈ ਕਿਸਮ", 
        sowingDateLabel: "ਬਿਜਾਈ ਦੀ ਮਿਤੀ", cropStageLabel: "ਫ਼ਸਲ ਦਾ ਪੜਾਅ", problemLabel: "ਮੌਜੂਦਾ ਸਮੱਸਿਆ", uploadImageLabel: "ਚਿੱਤਰ ਅੱਪਲੋਡ ਕਰੋ",
        
        locationOptions: ["ਟਿਕਾਣਾ ਚੁਣੋ", "ਆਟੋ-ਡਿਟੈਕਟ GPS", "ਜ਼ਿਲਾ A", "ਜ਼ਿਲਾ B", "ਜ਼ਿਲਾ C"],
        landSizeOptions: ["<1 ਏਕੜ", "1–5 ਏਕੜ", "5+ ਏਕੜ"], cropOptions: ["ਗੰਧੁਮ", "ਚੌਲ", "ਮੱਕੀ", "ਸੋਯਾਬੀਨ"], 
        soilTypeOptions: ["ਰੇਤਲੀ", "ਚਿਕਣੀ", "ਦੋਮਟ", "ਕਾਲੀ"],
        soilCharacterOptions: ["ਮਿੱਟੀ ਦਾ ਅੱਖਰ ਚੁਣੋ", "ਯਕੀਨੀ ਨਹੀਂ", "ਕਾਲਾ", "ਲਾਲ", "ਪੀਲਾ", "ਭੂਰਾ", "ਉੱਚ ਉਪਜਾਊ ਸ਼ਕਤੀ", "ਘੱਟ ਉਪਜਾਊ ਸ਼ਕਤੀ"],
        irrigationOptions: ["ਨਹਿਰ", "ਟਿਊਬਵੈਲ", "ਵਰਖਾ ਆਧਾਰਿਤ", "ਪੋੰਡ"], sowingOptions: ["ਹੱਥ ਨਾਲ", "ਮਸ਼ੀਨ ਨਾਲ"],
        cropStageOptions: ["ਸਟੇਜ ਚੁਣੋ", "ਪੌਦਾ", "ਸਬਜ਼ੀ", "ਫੁੱਲ", "ਕਟਾਈ"],
        problemOptions: ["ਸਮੱਸਿਆ ਚੁਣੋ", "ਖਾਦ ਮੁੱਦਾ", "ਸਿੰਚਾਈ ਮੁੱਦਾ", "ਰੋਗ", "ਕੀਟ", "ਹੋਰ"]
    },
    mr: {
        home: 'मुख्यपृष्ठ', myFarm: 'माझा शेत', todo: 'काम सूची', trend: 'स्थानिक ट्रेंड', feedback: 'अभिप्राय',
        search: 'शोधा...', websiteLanguage: "वेबसाइट भाषा:",
        heroTitle: 'कृषी सखी', heroSubtitle: '', heroDate: '', heroBtn: 'शेतकऱ्यांसाठी उत्तम मदत',
        voiceInputTitle: "व्हॉइस इनपुट", voiceInputSubtitle: "आपले तपशील आपल्या स्थानिक भाषेत रेकॉर्ड करा।", 
        formHeading: "फॉर्म तपशील प्रविष्ट करा", formDetailsHeading: "शेतीचे तपशील", submitBtn: "सादर करा",
        footerSchemes: 'योजना', footerMarketPrices: 'बाजारभाव', footerContact: 'संपर्क', footerCopy: '© 2025 कृषी सखी. सर्व हक्क राखीव।',
        
        locationLabel: "स्थान", landSizeLabel: "जमिनीचा आकार", cropLabel: "पिक", soilTypeLabel: "मातीचा प्रकार",
        soilCharacterLabel: "मातीचा प्रकार", irrigationLabel: "सिंचन स्रोत", sowingLabel: "पेरणी प्रकार", 
        sowingDateLabel: "पेरणीची तारीख", cropStageLabel: "पिकाचा टप्पा", problemLabel: "सध्याची समस्या", uploadImageLabel: "फोटो अपलोड करा",
        
        locationOptions: ["स्थान निवडा", "ऑटो-डिटेक्ट GPS", "जिल्हा A", "जिल्हा B", "जिल्हा C"],
        landSizeOptions: ["<1 एकर", "1–5 एकर", "5+ एकर"], cropOptions: ["गहू", "तांदूळ", "मका", "सोयाबीन"], 
        soilTypeOptions: ["वाळूची", "चिकणमाती", "पोयटा माती", "काळी"],
        soilCharacterOptions: ["मातीचा प्रकार निवडा", "माहित नाही", "काळी", "लाल", "पिवळी", "तपकिरी", "उच्च सुपीक", "कमी सुपीक"],
        irrigationOptions: ["कालवा", "ट्यूबवेल", "पावसावर अवलंबून", "तलाव"], sowingOptions: ["हाताने", "मशीनने"],
        cropStageOptions: ["टप्पा निवडा", "रोपण", "वनस्पति", "फुलांची", "कापणी"],
        problemOptions: ["समस्या निवडा", "खताचा प्रश्न", "सिंचनाचा प्रश्न", "रोग", "कीटक", "इतर"]
    },
    gu: {
        home: 'ઘર', myFarm: 'મારું ખેતર', todo: 'કાર્ય સૂચિ', trend: 'સ્થાનિક વલણ', feedback: 'પ્રતિભાવ',
        search: 'શોધો...', websiteLanguage: "વેબસાઇટ ભાષા:",
        heroTitle: 'કૃષિ સખી', heroSubtitle: '', heroDate: '', heroBtn: 'ખેડૂતોને વધુ સારું બનાવવામાં મદદ',
        voiceInputTitle: "વોઇસ ઇનપુટ", voiceInputSubtitle: "તમારી વિગતો તમારી સ્થાનિક ભાષામાં રેકોર્ડ કરો।", 
        formHeading: "ફોર્મ વિગતો દાખલ કરો", formDetailsHeading: "ખેતીની વિગતો", submitBtn: "સબમિટ કરો",
        footerSchemes: 'યોજનાઓ', footerMarketPrices: 'બજારના ભાવ', footerContact: 'સંપર્ક', footerCopy: '© 2025 કૃષિ સખી. સર્વાધિકાર સુરક્ષિત।',
        
        locationLabel: "સ્થાન", landSizeLabel: "જમીનનું કદ", cropLabel: "પાક", soilTypeLabel: "માટીનો પ્રકાર",
        soilCharacterLabel: "માટીનો પ્રકાર", irrigationLabel: "સિંચાઈ સ્ત્રોત", sowingLabel: "વાવણી પ્રકાર", 
        sowingDateLabel: "વાવણીની તારીખ", cropStageLabel: "પાકનો તબક્કો", problemLabel: "હાલની સમસ્યા", uploadImageLabel: "ફોટો અપલોડ કરો",
        
        locationOptions: ["સ્થાન પસંદ કરો", "ઓટો-ડીટેક્ટ GPS", "જિલ્લો A", "જિલ્લો B", "જિલ્લો C"],
        landSizeOptions: ["<1 એકર", "1–5 એકર", "5+ એકર"], cropOptions: ["ઘઉં", "ચોખા", "મકાઈ", "સોયાબીન"], 
        soilTypeOptions: ["રેતાળ", "ચીકણી", "ગોરાડુ", "કાળી"],
        soilCharacterOptions: ["માટીનો પ્રકાર પસંદ કરો", "ખબર નથી", "કાળી", "લાલ", "પીળી", "ભૂરી", "ઉચ્ચ ફળદ્રુપતા", "ઓછી ફળદ્રુપતા"],
        irrigationOptions: ["નહેર", "ટ્યુબવેલ", "વરસાદ આધારિત", "તળાવ"], sowingOptions: ["હાથથી", "મશીનથી"],
        cropStageOptions: ["તબક્કો પસંદ કરો", "બીજ", "વૃક્ષારોપણ", "ફૂલ", "લણણી"],
        problemOptions: ["સમસ્યા પસંદ કરો", "ખાતરનો મુદ્દો", "સિંચાઈનો મુદ્દો", "રોગ", "જંતુ", "અન્ય"]
    },
    bn: {
        home: 'হোম', myFarm: 'আমার খামার', todo: 'করার তালিকা', trend: 'স্থানীয় ট্রেন্ড', feedback: 'ফিডব্যাক',
        search: 'অনুসন্ধান...', websiteLanguage: "ওয়েবসাইট ভাষা:",
        heroTitle: 'কৃষি সখী', heroSubtitle: '', heroDate: '', heroBtn: 'কৃষকদের উন্নত করতে সাহায্য',
        voiceInputTitle: "ভয়েস ইনপুট", voiceInputSubtitle: "আপনার স্থানীয় ভাষায় আপনার বিবরণ রেকর্ড করুন।", 
        formHeading: "ফর্মের বিবরণ লিখুন", formDetailsHeading: "খামারের বিবরণ", submitBtn: "জমা দিন",
        footerSchemes: 'স্কিম', footerMarketPrices: 'বাজার মূল্য', footerContact: 'যোগাযোগ', footerCopy: '© 2025 কৃষি সখী. সর্বস্বত্ব সংরক্ষিত।',
        
        locationLabel: "অবস্থান", landSizeLabel: "জমির আকার", cropLabel: "ফসল", soilTypeLabel: "মাটির ধরন",
        soilCharacterLabel: "মাটির চরিত্র", irrigationLabel: "সেচের উৎস", sowingLabel: "বপনের ধরন", 
        sowingDateLabel: "বপনের তারিখ", cropStageLabel: "ফসল পর্যায়", problemLabel: "বর্তমান সমস্যা", uploadImageLabel: "ছবি আপলোড করুন",
        
        locationOptions: ["অবস্থান নির্বাচন করুন", "অটো-ডিটেক্ট GPS", "জেলা A", "জেলা B", "জেলা C"],
        landSizeOptions: ["<1 একর", "1–5 একর", "5+ একর"], cropOptions: ["গম", "ধান", "ভুট্টা", "সয়াবিন"], 
        soilTypeOptions: ["বেলে", "কাদামাটি", "দোআঁশ", "কালো"],
        soilCharacterOptions: ["মাটির চরিত্র নির্বাচন করুন", "নিশ্চিত না", "কালো", "লাল", "হলুদ", "বাদামী", "উচ্চ উর্বরতা", "নিম্ন উর্বরता"],
        irrigationOptions: ["খাল", "টিউবওয়েল", "বৃষ্টি নির্ভর", "পুকুর"], sowingOptions: ["ম্যানুয়াল", "মেশিন"],
        cropStageOptions: ["পর্যায় নির্বাচন করুন", "চারা", "উদ্ভিজ্জ", "ফুল", "ফসল কাটা"],
        problemOptions: ["সমস্যা নির্বাচন করুন", "সার সমস্যা", "সেচ সমস্যা", "রোগ", "পোকামাকড়", "অন্যান্য"]
    },
    ta: {
        home: 'முகப்பு', myFarm: 'எனது பண்ணை', todo: 'செய்ய வேண்டியவை', trend: 'உள்ளூர் போக்கு', feedback: 'பின்னூட்டம்',
        search: 'தேடல்...', websiteLanguage: "இணையதள மொழி:",
        heroTitle: 'கிரிஷி சகி', heroSubtitle: '', heroDate: '', heroBtn: 'விவசாயிகளுக்கு மேம்படுத்த உதவும்',
        voiceInputTitle: "குரல் உள்ளீடு", voiceInputSubtitle: "உங்கள் உள்ளூர் மொழியில் உங்கள் விவரங்களை பதிவு செய்யவும்।", 
        formHeading: "படிவ விவரங்களை உள்ளிடவும்", formDetailsHeading: "பண்ணை விவரங்கள்", submitBtn: "சமர்ப்பிக்கவும்",
        footerSchemes: 'திட்டங்கள்', footerMarketPrices: 'சந்தை விலைகள்', footerContact: 'தொடர்பு', footerCopy: '© 2025 கிரிஷி சகி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை।',
        
        locationLabel: "இடம்", landSizeLabel: "நில அளவு", cropLabel: "பயிர்", soilTypeLabel: "மண் வகை",
        soilCharacterLabel: "மண் தன்மை", irrigationLabel: "நீர்ப்பாசன மூலம்", sowingLabel: "விதைப்பு வகை", 
        sowingDateLabel: "விதைப்பு தேதி", cropStageLabel: "பயிர் நிலை", problemLabel: "தற்போதைய சிக்கல்", uploadImageLabel: "படம் பதிவேற்றம்",
        
        locationOptions: ["இடம் தேர்வு செய்யவும்", "தானாக கண்டறிதல் GPS", "மாவட்டம் A", "மாவட்டம் B", "மாவட்டம் C"],
        landSizeOptions: ["<1 ஏக்கர்", "1–5 ஏக்கர்", "5+ ஏக்கர்"], cropOptions: ["கோதுமை", "அரிசி", "சோளம்", "சோயாபீன்"], 
        soilTypeOptions: ["மணல்", "களிமண்", "வண்டல்", "கருப்பு"],
        soilCharacterOptions: ["மண் தன்மையை தேர்வு செய்யவும்", "உறுதியாக இல்லை", "கருப்பு", "சிவப்பு", "மஞ்சள்", "பழுப்பு", "அதிக வளத்தன்மை", "குறைந்த வளத்தன்மை"],
        irrigationOptions: ["கால்வாய்", "ஆழ்துளை கிணறு", "மழைநீர்", "குளம்"], sowingOptions: ["கையால்", "இயந்திரம்"],
        cropStageOptions: ["பயிர் வளர்ச்சியை தேர்வு செய்யவும்", "விதைப்பு", "தாவர வளர்ச்சி", "பூப்பு", "அறுவடை"],
        problemOptions: ["பிரச்சனையை தேர்வு செய்யவும்", "உரப் பிரச்சனை", "நீர்ப்பாசனப் பிரச்சனை", "நோய்", "பூச்சி", "மற்றவை"]
    },
    te: {
        home: 'హోమ్', myFarm: 'నా పొలం', todo: 'చేయవలసినవి', trend: 'స్థానిక పోకడ', feedback: 'అభిప్రాయం',
        search: 'వెతకండి...', websiteLanguage: "వెబ్‌సైట్ భాష:",
        heroTitle: 'కృషి సఖి', heroSubtitle: '', heroDate: '', heroBtn: 'రైతులకు మెరుగైన సహాయం',
        voiceInputTitle: "వాయిస్ ఇన్పుట్", voiceInputSubtitle: "మీ వివరాలను మీ స్థానిక భాషలో రికార్డ్ చేయండి।", 
        formHeading: "ఫారం వివరాలు నమోదు చేయండి", formDetailsHeading: "పొలం వివరాలు", submitBtn: "సమర్పించు",
        footerSchemes: 'పథకాలు', footerMarketPrices: 'బజార్ ధరలు', footerContact: 'సంప్రదించండి', footerCopy: '© 2025 కృషి సఖి. అన్ని హక్కులు రిజర్వ్ చేయబడినవి।',
        
        locationLabel: "స్థానం", landSizeLabel: "భూమి పరిమాణం", cropLabel: "పంట", soilTypeLabel: "మట్టి రకం",
        soilCharacterLabel: "నేల లక్షణం", irrigationLabel: "పారిశుధ్య మూలం", sowingLabel: "విత్తన రకం", 
        sowingDateLabel: "విత్తన తేదీ", cropStageLabel: "పంట దశ", problemLabel: "ప్రస్తుత సమస్య", uploadImageLabel: "చిత్రం అప్‌లోడ్ చేయండి",
        
        locationOptions: ["స్థానం ఎంచుకోండి", "ఆటో-డిటెక్ట్ GPS", "జిల్లా A", "జిల్లా B", "జిల్లా C"],
        landSizeOptions: ["<1 ఎకరం", "1–5 ఎకరాలు", "5+ ఎకరాలు"], cropOptions: ["గోధుమ", "బియ్యం", "మొక్కజొన్న", "సోయాబీన్"], 
        soilTypeOptions: ["ఇసుక", "బంకమట్టి", "లోమీ", "నలుపు"],
        soilCharacterOptions: ["నేల లక్షణం ఎంచుకోండి", "ఖచ్చితంగా తెలియదు", "నలుపు", "ఎరుపు", "పసుపు", "గోధుమ", "అధిక సారవంతం", "తక్కువ సారవంతం"],
        irrigationOptions: ["కాలువ", "బోరు బావి", "వర్షాధారం", "చెరువు"], sowingOptions: ["మాన్యువల్", "యంత్రం"],
        cropStageOptions: ["దశను ఎంచుకోండి", "నారు", "కూరగాయలు", "పూత", "కోత"],
        problemOptions: ["సమస్యను ఎంచుకోండి", "ఎరువుల సమస్య", "నీటిపారుదల సమస్య", "వ్యాధి", "తెగులు", "ఇతర"]
    },
    kn: {
        home: 'ಮನೆ', myFarm: 'ನನ್ನ ಹೊಲ', todo: 'ಮಾಡಬೇಕಾದ ಕೆಲಸ', trend: 'ಸ್ಥಳೀಯ ಟ್ರೆಂಡ್', feedback: 'ಪ್ರತಿಕ್ರಿಯೆ',
        search: 'ಹುಡುಕಿ...', websiteLanguage: "ವೆಬ್ಸೈಟ್ ಭಾಷೆ:",
        heroTitle: 'ಕೃಷಿ ಸಖಿ', heroSubtitle: '', heroDate: '', heroBtn: 'ರೈತರಿಗೆ ಉತ್ತಮ ಸಹಾಯ ಮಾಡಲು',
        voiceInputTitle: "ಧ್ವನಿ ಇನ್ಪುಟ್", voiceInputSubtitle: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಿ।", 
        formHeading: "ಫಾರ್ಮ್ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ", formDetailsHeading: "ಫಾರ್ಮ್ ವಿವರಗಳು", submitBtn: "ಸಲ್ಲಿಸಿ",
        footerSchemes: 'ಯೋಜನೆಗಳು', footerMarketPrices: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು', footerContact: 'ಸಂಪರ್ಕ', footerCopy: '© 2025 ಕೃಷಿ ಸಖಿ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ।',
        
        locationLabel: "ಸ್ಥಳ", landSizeLabel: "ಭೂಮಿ ಗಾತ್ರ", cropLabel: "ಬೆಳೆ", soilTypeLabel: "ಮಣ್ಣು ಪ್ರಕಾರ",
        soilCharacterLabel: "ಮಣ್ಣಿನ ಗುಣಲಕ್ಷಣ", irrigationLabel: "ನೀರಾವರಿ ಮೂಲ", sowingLabel: "ಬಿತ್ತನೆ ಪ್ರಕಾರ", 
        sowingDateLabel: "ಬಿತ್ತನೆ ದಿನಾಂಕ", cropStageLabel: "ಬೆಳೆ ಹಂತ", problemLabel: "ಪ್ರಸ್ತುತ ಸಮಸ್ಯೆ", uploadImageLabel: "ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
        
        locationOptions: ["ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ", "ಆಟೋ-ಡಿಟೇಕ್ಟ್ GPS", "ಜಿಲ್ಲೆ A", "ಜಿಲ್ಲೆ B", "ಜಿಲ್ಲೆ C"],
        landSizeOptions: ["<1 ಎಕರೆ", "1–5 ಎಕರೆ", "5+ ಎಕರೆ"], cropOptions: ["ಗೋಧಿ", "ಅಕ್ಕಿ", "ಮೆಕ್ಕೆಜೋಳ", "ಸೋಯಾಬೀನ್"], 
        soilTypeOptions: ["ಮರಳು", "ಕ್ಲೇ", "ಲೋಮಿ", "ಕಪ್ಪು"],
        soilCharacterOptions: ["ಮಣ್ಣಿನ ಗುಣಲಕ್ಷಣ ಆಯ್ಕೆಮಾಡಿ", "ಖಚಿತವಾಗಿಲ್ಲ", "ಕಪ್ಪು", "ಕೆಂಪು", "ಹಳದಿ", "ಕಂದು", "ಹೆಚ್ಚಿನ ಫಲವತ್ತತೆ", "ಕಡಿಮೆ ಫಲವತ್ತತೆ"],
        irrigationOptions: ["ಕಾಲುವೆ", "ಕೊಳವೆ ಬಾವಿ", "ಮಳೆ ಆಧಾರಿತ", "ಕೆರೆ"], sowingOptions: ["ಕೈಯಿಂದ", "ಯಂತ್ರದಿಂದ"],
        cropStageOptions: ["ಹಂತವನ್ನು ಆಯ್ಕೆಮಾಡಿ", "ಸಸಿ", "ಸಸ್ಯಕ", "ಹೂಬಿಡುವುದು", "ಕೊಯ್ಲು"],
        problemOptions: ["ಸಮಸ್ಯೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", "ಗೊಬ್ಬರ ಸಮಸ್ಯೆ", "ನೀರಾವರಿ ಸಮಸ್ಯೆ", "ರೋಗ", "ಕೀಟ", "ಇತರೆ"]
    },
    ml: {
        home: 'ഹോം', myFarm: 'എന്റെ കൃഷി', todo: 'ചെയ്യേണ്ട കാര്യങ്ങൾ', trend: 'പ്രാദേശിക പ്രവണത', feedback: 'അഭിപ്രായം',
        search: 'തിരയുക...', websiteLanguage: "വെബ്സൈറ്റ് ഭാഷ:",
        heroTitle: 'കൃഷി സഖി', heroSubtitle: '', heroDate: '', heroBtn: 'കർഷകരെ മെച്ചപ്പെടുത്താൻ സഹായിക്കുക',
        voiceInputTitle: "വോയ്‌സ് ഇൻപുട്ട്", voiceInputSubtitle: "നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ നിങ്ങളുടെ വിവരങ്ങൾ രേഖപ്പെടുത്തുക।", 
        formHeading: "ഫോം വിശദാംശങ്ങൾ നൽകുക", formDetailsHeading: "കൃഷിഭൂമിയുടെ വിവരങ്ങൾ", submitBtn: "സമർപ്പിക്കുക",
        footerSchemes: 'പദ്ധതികൾ', footerMarketPrices: 'വിപണി വിലകൾ', footerContact: 'ബന്ധപ്പെടുക', footerCopy: '© 2025 കൃഷി സഖി. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം।',
        
        locationLabel: "സ്ഥലം", landSizeLabel: "ഭൂമി വലിപ്പം", cropLabel: "വിള", soilTypeLabel: "മണ്ണിന്റെ തരം",
        soilCharacterLabel: "മണ്ണിന്റെ സ്വഭാവം", irrigationLabel: "നനയ്ക്കൽ ഉറവിടം", sowingLabel: "വിത്ത് തരം", 
        sowingDateLabel: "വിത്ത് തീയതി", cropStageLabel: "വിള ഘട്ടം", problemLabel: "നിലവിലെ പ്രശ്നം", uploadImageLabel: "ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
        
        locationOptions: ["സ്ഥലം തിരഞ്ഞെടുക്കുക", "ഓട്ടോ-ഡിറ്റക്റ്റ് GPS", "ജില്ല A", "ജില്ല B", "ജില്ല C"],
        landSizeOptions: ["<1 ഏക്കർ", "1–5 ഏക്കർ", "5+ ഏക്കർ"], cropOptions: ["ഗോതമ്പ്", "അരി", "ചോളം", "സോയാബീൻ"], 
        soilTypeOptions: ["മണലിൽ", "കളിമണ്ണ്", "പശിമരാശി", "കറുപ്പ്"],
        soilCharacterOptions: ["മണ്ണിന്റെ സ്വഭാവം തിരഞ്ഞെടുക്കുക", "ഉറപ്പില്ല", "കറുപ്പ്", "ചുവപ്പ്", "മഞ്ഞ", "തവിട്ട്", "ഉയർന്ന ഫലഭൂയിഷ്ഠത", "കുറഞ്ഞ ഫലഭൂയിഷ്ഠത"],
        irrigationOptions: ["കനാൽ", "കുഴൽക്കിണർ", "മഴയെ ആശ്രയിച്ചുള്ള", "കുളം"], sowingOptions: ["കൈകൊണ്ട്", "മെഷീൻ കൊണ്ട്"],
        cropStageOptions: ["ഘട്ടം തിരഞ്ഞെടുക്കുക", "വിത്ത്", "സസ്യങ്ങൾ", "പൂവിടൽ", "വിളവെടുപ്പ്"],
        problemOptions: ["പ്രശ്നം തിരഞ്ഞെടുക്കുക", "വളം പ്രശ്നം", "നനയ്ക്കൽ പ്രശ്നം", "രോഗം", "കീടം", "മറ്റുള്ളവ"]
    },
    or: {
        home: 'ମୁଖ୍ୟପୃଷ୍ଠା', myFarm: 'ମୋର କ୍ଷେତ', todo: 'କାର୍ଯ୍ୟ କରିବା ତାଲିକା', trend: 'ସ୍ଥାନୀୟ ଟ୍ରେଣ୍ଡ', feedback: 'ଫିଡବ୍ୟାକ',
        search: 'ଖୋଜ...', websiteLanguage: "ୱେବସାଇଟ ଭାଷା:",
        heroTitle: 'କୃଷି ସଖି', heroSubtitle: '', heroDate: '', heroBtn: 'ଚାଷୀମାନଙ୍କୁ ଉନ୍ନତ କରିବାରେ ସାହାଯ୍ୟ',
        voiceInputTitle: "ଭଏସ ଇନପୁଟ", voiceInputSubtitle: "ଆପଣଙ୍କ ସ୍ଥାନୀୟ ଭାଷାରେ ଆପଣଙ୍କ ବିବରଣୀ ରେକର୍ଡ କରନ୍ତੁ।", 
        formHeading: "ଫର୍ମର ବିବରଣୀ ଦିଅନ୍ତୁ", formDetailsHeading: "କ୍ଷେତର ବିବରଣୀ", submitBtn: "ଦାଖଲ କରନ୍ତୁ",
        footerSchemes: 'ଯୋଜନା', footerMarketPrices: 'ବଜାର ମୂଲ୍ୟ', footerContact: 'ଯୋଗାଯୋଗ', footerCopy: '© 2025 କୃଷି ସଖି. ସର୍ବସତ୍ତ୍ବ ସଂରକ୍ଷିତ।',
        
        locationLabel: "ଅବସ୍ଥାନ", landSizeLabel: "ଜମିର ଆକାର", cropLabel: "ଫସଲ", soilTypeLabel: "ମାଟିର ପ୍ରକାର",
        soilCharacterLabel: "ମାଟିର ପ୍ରକାର", irrigationLabel: "ସିଞ୍ଚନ ଉତ୍ସ", sowingLabel: "ବିଜ ବିଜାଇ ପ୍ରକାର", 
        sowingDateLabel: "ବିଜ ବିਜାଇ ତାରିଖ", cropStageLabel: "ଫସଲର ପର୍ଯ୍ୟାୟ", problemLabel: "ସାମ୍ପ୍ରତିକ ସମସ୍ୟା", uploadImageLabel: "ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ",
        
        locationOptions: ["ଅବସ୍ଥାନ ଚୟନ କରନ୍ତୁ", "ଅଟୋ-ଡିଟେକ୍ଟ GPS", "ଜିଲ୍ଲା A", "ଜିଲ୍ଲା B", "ଜିଲ୍ଲା C"],
        landSizeOptions: ["<1 ଏକର", "1–5 ଏକର", "5+ ଏକର"], cropOptions: ["ଗହମ", "ଧାନ", "ମକା", "ସୋୟାବିନ୍"], 
        soilTypeOptions: ["ବାଲି", "ମାଟି", "ଦୋମଟ", "କଳା"],
        soilCharacterOptions: ["ମାଟିର ପ୍ରକାର ଚୟନ କରନ୍ତୁ", "ନିଶ୍ଚਿਤ ନୁହେଁ", "କଳା", "ଲାଲ", "ହଳଦିଆ", "ବାଦାਮୀ", "ଉଚ୍ଚ ଉର୍ବରତା", "କମ୍ ଉର୍ବରତା"],
        irrigationOptions: ["କେନାଲ", "ଟ୍ୟୁବୱେଲ", "ବର୍ଷା ଉପରେ ନିର୍ଭର", "ପୋଖରୀ"], sowingOptions: ["ହାତରେ", "ମେସିନରେ"],
        cropStageOptions: ["ପର୍ଯ୍ୟାୟ ଚୟନ କରନ୍ତୁ", "ଚାରା", "ଉଦ୍ଭିଦ", "ଫୁଲ ଧରିବା", "ଅମଳ"],
        problemOptions: ["ସମସ୍ୟା ଚୟନ କରନ୍ତୁ", "ସାର ସମସ୍ୟା", "ଜଳସେಚନ ସମସ୍ୟା", "ରୋଗ", "କୀଟ", "ଅନ୍ୟ"]
    },
    as: {
        home: 'गृह', myFarm: 'মোৰ পাম', todo: 'কৰিবলগীয়া তালিকা', trend: 'স্থানীয় প্ৰৱণতা', feedback: 'প্ৰতিক্ৰিয়া',
        search: 'সন্ধান...', websiteLanguage: "ৱেবছাইটৰ ভাষা:",
        heroTitle: 'কৃষি সখী', heroSubtitle: '', heroDate: '', heroBtn: 'কৃষকসকলক উন্নত কৰাত সহায় কৰা',
        voiceInputTitle: "ভইচ ইনপুট", voiceInputSubtitle: "আপোনাৰ স্থানীয় ভাষাত আপোনাৰ বিৱৰণ ৰেকৰ্ড কৰক।", 
        formHeading: "ফৰ্মৰ বিৱৰণ দিয়ক", formDetailsHeading: "পামৰ বিৱৰণ", submitBtn: "দাখিল কৰক",
        footerSchemes: 'আঁচনি', footerMarketPrices: 'বজাৰৰ দাম', footerContact: 'যোগাযোগ', footerCopy: '© 2025 কৃষি সখী. সকলো অধিকাৰ সংৰক্ষিত।',
        
        locationLabel: "অৱস্থান", landSizeLabel: "মাটিৰ আকাৰ", cropLabel: "শস্য", soilTypeLabel: "মাটিৰ ধৰণ",
        soilCharacterLabel: "মাটিৰ চৰিত্ৰ", irrigationLabel: "সেচৰ উৎস", sowingLabel: "বপন ধৰণ", 
        sowingDateLabel: "বপনৰ তাৰিখ", cropStageLabel: "শস্যৰ স্তৰ", problemLabel: "বৰ্তমানৰ সমস্যা", uploadImageLabel: "ছবি আপলোড কৰক",
        
        locationOptions: ["অৱস্থান বাছক", "অটো-ডিটেক্ট GPS", "জিলা A", "জিলা B", "জিলা C"],
        landSizeOptions: ["<1 একৰ", "1–5 একਰ", "5+ একৰ"], cropOptions: ["ঘেঁহু", "ধান", "মাকৈ", "ছয়াবিন"], 
        soilTypeOptions: ["বালি", "চিনামাটি", "দোআঁশ", "কলা"],
        soilCharacterOptions: ["মাটিৰ চৰিত্ৰ বাছক", "নিশ্চিত নহয়", "কলা", "ৰঙা", "হালধীয়া", "মুগা", "উচ্চ উর্বৰতা", "কম উর্বৰতা"],
        irrigationOptions: ["খাল", "টিউবৱেল", "বৰষুণৰ ওপৰত নিৰ্ভৰশীল", "পুখুৰী"], sowingOptions: ["হাতেৰে", "যন্ত্ৰৰে"],
        cropStageOptions: ["স্তৰ বাছক", "গছপুলি", "উদ্ভিদ", "ফুলা", "শস্য চপোৱা"],
        problemOptions: ["সমস্যা বাছক", "সাৰৰ সমস্যা", "জলসিঞ্চনৰ সমস্যা", "ৰোগ", "কীট", "অন্যান্য"]
    },
    ur: {
        home: 'صفحہ اول', myFarm: 'میرا کھیت', todo: 'کرنے کی فہرست', trend: 'مقامی رجحان', feedback: 'رائے',
        search: 'تلاش کریں...', websiteLanguage: "ویب سائٹ کی زبان:",
        heroTitle: 'کرشی سکھی', heroSubtitle: '', heroDate: '', heroBtn: 'کاشتکاروں کو بہتر بنانے میں مدد کرنا',
        voiceInputTitle: "صوتی ان پٹ", voiceInputSubtitle: "اپنی تفصیلات اپنی مقامی زبان میں ریکارڈ کریں۔", 
        formHeading: "فارم کی تفصیل درج کریں", formDetailsHeading: "کھیت کی تفصیلات", submitBtn: "جمع کرائیں",
        footerSchemes: 'اسکیمیں', footerMarketPrices: 'بازار کی قیمتیں', footerContact: 'رابطہ', footerCopy: '© 2025 کرشی سکھی. تمام حقوق محفوظ ہیں۔',
        
        locationLabel: "مقام", landSizeLabel: "زمین کا سائز", cropLabel: "فصل", soilTypeLabel: "مٹی کی قسم",
        soilCharacterLabel: "مٹی کی قسم", irrigationLabel: "آبپاشی کا ذریعہ", sowingLabel: "بوائی کی قسم", 
        sowingDateLabel: "بوائی کی تاریخ", cropStageLabel: "فصل کا مرحلہ", problemLabel: "موجودہ مسئلہ", uploadImageLabel: "تصویر اپ لوڈ کریں",
        
        locationOptions: ["مقام منتخب کریں", "آٹو-ڈیٹیکٹ GPS", "ضلع A", "ضلع B", "ضلع C"],
        landSizeOptions: ["<1 ایکڑ", "1–5 ایکڑ", "5+ ایکڑ"], cropOptions: ["گندم", "چاول", "مکئی", "سویابین"], 
        soilTypeOptions: ["ریتیلی", "چکنی مٹی", "دومٹ", "کالی"],
        soilCharacterOptions: ["مٹی کی قسم منتخب کریں", "یقینی نہیں", "کالی", "سرخ", "پیلی", "بھوری", "اعلی زرخیزی", "کم زرخیزی"],
        irrigationOptions: ["نہر", "ٹیوب ویل", "بارش پر منحصر", "تالاب"], sowingOptions: ["ہاتھ سے", "مشین سے"],
        cropStageOptions: ["مرحلہ منتخب کریں", "پودا", "سبزیوں کا", "پھولوں کا", "کٹائی"],
        problemOptions: ["مسئلہ منتخب کریں", "کھاد کا مسئلہ", "آبپاشی کا مسئلہ", "بیماری", "کیڑے", "دیگر"]
    },
    sd: {
        home: 'گھر', myFarm: 'منهنجو کھیت', todo: 'ڪم جي فهرست', trend: 'مقامی رجحان', feedback: 'رايا',
        search: 'ڳولهيو...', websiteLanguage: "ويب سائيٽ جي ٻولي:",
        heroTitle: 'ڪرشي سکھي', heroSubtitle: '', heroDate: '', heroBtn: 'هاري کي بہتر بڻائڻ ۾ مدد ڪريو',
        voiceInputTitle: "آواز جي داخلا", voiceInputSubtitle: "پنهنجا تفصيل پنهنجي مقامي ٻولي ۾ رڪارڊ ڪريو.", 
        formHeading: "فارم جا تفصيل داخل ڪريو", formDetailsHeading: "کھیت جا تفصيل", submitBtn: "جمع ڪرايو",
        footerSchemes: 'اسڪيمون', footerMarketPrices: 'مارڪيٽ جا قدر', footerContact: 'رابطو', footerCopy: '© 2025 ڪرشي سکھي. سڀ حق محفوظ آھن.',
        
        locationLabel: "جاءِ", landSizeLabel: "زمين جو سائيز", cropLabel: "فصل", soilTypeLabel: "مٽي جو قسم",
        soilCharacterLabel: "مٽي جو قسم", irrigationLabel: "آبپاشي جو ذريعو", sowingLabel: "پوک جو قسم", 
        sowingDateLabel: "پوک جي تاريخ", cropStageLabel: "فصل جو مرحلو", problemLabel: "هاڻوڪو مسئلو", uploadImageLabel: "تصوير اپلوڊ ڪريو",
        
        locationOptions: ["جاءِ چونڊيو", "آٽو-ڊيٽيڪٽ GPS", "ضلع A", "ضلع B", "ضلع C"],
        landSizeOptions: ["<1 ايڪڙ", "1–5 ايڪڙ", "5+ ايڪڙ"], cropOptions: ["ڪڻڪ", "چانور", "مڪئي", "سويابين"], 
        soilTypeOptions: ["واريء", "چيڪني", "دومٽ", "ڪاري"],
        soilCharacterOptions: ["مٽي جو قسم چونڊيو", "پڪ ناهي", "ڪاري", "لال", "پيلي", "گهرڙي", "وڌيڪ زرخيز", "گهٽ زرخيز"],
        irrigationOptions: ["واهه", "ٽيوب ويل", "برساتي", "تلاءُ"], sowingOptions: ["هٿ سان", "مشين سان"],
        cropStageOptions: ["مرحلو چونڊيو", "ٻوٽو", "وڌندڙ", "گل", "ڪٽائي"],
        problemOptions: ["مسئلو چونڊيو", "ڀاڻ جو مسئلو", "آبپاشي جو مسئلو", "بيماري", "ڪيڙا", "ٻيا"]
    },
    sa: {
        home: 'गृहम्', myFarm: 'मम क्षेत्रम्', todo: 'करणीयसूची', trend: 'स्थानीयप्रवृत्तिः', feedback: 'प्रतिपुष्टिः',
        search: 'अन्वेषणम्...', websiteLanguage: "जालपुटभाषा:",
        heroTitle: 'कृषि सखी', heroSubtitle: '', heroDate: '', heroBtn: 'कृषकान् उन्नतं कर्तुं साहाय्यम्',
        voiceInputTitle: "ध्वनि-निवेशः", voiceInputSubtitle: "स्वतः विवरणं स्वभाषया अभिलेखयतु।", 
        formHeading: "रूपस्य विवरणं प्रविशतु", formDetailsHeading: "कृषिक्षेत्रविवरणानि", submitBtn: "प्रस्तुतम्",
        footerSchemes: 'योजनाः', footerMarketPrices: 'आपणमूल्यानि', footerContact: 'सम्पर्कः', footerCopy: '© 2025 कृषि सखी। सर्वे अधिकाराः सुरक्षिताः।',
        
        locationLabel: "स्थानम्", landSizeLabel: "भूमेः आकारः", cropLabel: "कृषिः", soilTypeLabel: "मृत्तिका प्रकारः",
        soilCharacterLabel: "मृत्तिकायाः लक्षणम्", irrigationLabel: "सिंचन स्रोतः", sowingLabel: "बीजन प्रकारः", 
        sowingDateLabel: "बीजनस्य तिथिः", cropStageLabel: "सस्यस्य अवस्था", problemLabel: "वर्तमानसमस्या", uploadImageLabel: "चित्रं प्रेषयतु",
        
        locationOptions: ["स्थानं चिनोतु", "स्वयं-अन्वेषण GPS", "मण्डलम् A", "मण्डलम् B", "मण्डलम् C"],
        landSizeOptions: ["<1 एकरम्", "1–5 एकरम्", "5+ एकरम्"], cropOptions: ["गोधूमः", "तण्डुलः", "मक्का", "सोयाबीन"], 
        soilTypeOptions: ["सिकतामयम्", "मृत्तिका", "लोमी", "कृष्णम्"],
        soilCharacterOptions: ["मृत्तिकायाः लक्षणं चिनोतु", "निश्चितं नास्ति", "कृष्णम्", "रक्तम्", "पीतम्", "पलाशि", "उच्चा उर्वरता", "न्यूनोर्वरता"],
        irrigationOptions: ["नदी", "कूपः", "वर्षाश्रितः", "सरसः"], sowingOptions: ["हस्तेन", "यन्त्रेण"],
        cropStageOptions: ["अवस्थां चिनोतु", "बीजकम्", "वनस्पतिः", "पुष्पम्", "सस्यच्छेदः"],
        problemOptions: ["समस्यां चिनोतु", "उर्वरकसम्बंधी", "सिंचनसम्बंधी", "रोगः", "कीटः", "अन्यत्"]
    },
    ks: {
        home: 'گَرٕ', myFarm: 'میون کھیت', todo: 'کرنچۍ ہَنز فہرست', trend: 'مُقامی روٗج', feedback: 'رائے',
        search: 'چھان چھوٚل...', websiteLanguage: "ویب سائٹ چھہِ زبان:",
        heroTitle: 'کرشی سکھ', heroSubtitle: '', heroDate: '', heroBtn: 'زٔمین وٲلؠن بہتر بناونہٕ خاطرٕ مدد',
        voiceInputTitle: "آواز دٲخل کرُن", voiceInputSubtitle: "تۄہندِ تفصِیل تہِ پٲٹھی چھِ ریکارڈ کرِتھ یٕم کٔشیٖرؠ زَبانہِ مَنٛز۔", 
        formHeading: "فارم چھُ تفصیل درج کرُن", formDetailsHeading: "کھیت چھِ تفصیل", submitBtn: "جمع کرُن",
        footerSchemes: 'سکیمہٕ', footerMarketPrices: 'بازارٕچ قٲمَتہٕ', footerContact: 'رٲبطہٕ', footerCopy: '© 2025 کرشی سکھ. سٲرِوٕے حقٕ چھِ محفوٗظ.',
        
        locationLabel: "جای", landSizeLabel: "زمین چھ سائز", cropLabel: "فصل", soilTypeLabel: "مٹی چھ قسم",
        soilCharacterLabel: "مٹی چھ صفت", irrigationLabel: "آبپاشی چھ ذریعہ", sowingLabel: "بوائی چھ قسم", 
        sowingDateLabel: "بوائی ہند چھ تاریخ", cropStageLabel: "فصل چھ مرحلہ", problemLabel: "اوسنیٚ مسئلہ", uploadImageLabel: "فوٹو اپ لوڈ کریو",
        
        locationOptions: ["جای چھون", "آٹو-ڈیٹیکٹ GPS", "ضلعہ A", "ضلعہ B", "ضلعہ C"],
        landSizeOptions: ["<1 ایکڑ", "1–5 ایکڑ", "5+ ایکڑ"], cropOptions: ["گومہ", "چانور", "مکئی", "سویابین"], 
        soilTypeOptions: ["ریتہ", "مٹی", "دومٹ", "سیاہ"],
        soilCharacterOptions: ["مٹی چھ صفت چھون", "یقینی نہ", "سیاہ", "لعل", "زرد", "نارنجی", "اچھ زرخیزی", "کم زرخیزی"],
        irrigationOptions: ["نہر", "ٹیوب ویل", "وارژہ", "کول"], sowingOptions: ["دستہ", "مشینہ"],
        cropStageOptions: ["مرحلہ چھون", "نول", "واہن", "وؤل", "کوش"],
        problemOptions: ["مسئلہ چھون", "کھادُک مسئلہ", "آبپاشی ہند مسئلہ", "بیماری", "کیٚوٕ", "بییہ"]
    },
    kok: {
        home: 'घर', myFarm: 'म्हाजें शेत', todo: 'करपाची वळेरी', trend: 'स्थानिक ट्रेंड', feedback: 'फीडबॅक',
        search: 'सोद...', websiteLanguage: "वेबसाइट भास:",
        heroTitle: 'कृषि सखी', heroSubtitle: '', heroDate: '', heroBtn: 'शेतकामत्यांक बरे करपाक मदत',
        voiceInputTitle: "आवाज घालप", voiceInputSubtitle: "तुमची माहिती तुमच्या स्थानिक भाशेंत रेकॉर्ड करा।", 
        formHeading: "फॉर्म तपशील घालात", formDetailsHeading: "शेताचे तपशील", submitBtn: "दिवा",
        footerSchemes: 'योजना', footerMarketPrices: 'बाजारभाव', footerContact: 'संपर्क', footerCopy: '© 2025 कृषि सखी. सगळे हक्क राखून दवरल्यात।',
        
        locationLabel: "सुवात", landSizeLabel: "भूमीचे आकार", cropLabel: "पिक", soilTypeLabel: "मातीचा प्रकार",
        soilCharacterLabel: "मातीची प्रकृती", irrigationLabel: "सिंचन स्रोत", sowingLabel: "पेरणी प्रकार", 
        sowingDateLabel: "पेरणीची तारीख", cropStageLabel: "पिकाचो टप्पो", problemLabel: "सद्य समस्या", uploadImageLabel: "फोटो अपलोड करा",
        
        locationOptions: ["सुवात निवडात", "ऑटो-डि-detect GPS", "जिल्हा A", "जिल्हा B", "जिल्हा C"],
        landSizeOptions: ["<1 एकर", "1–5 एकर", "5+ एकर"], cropOptions: ["गव", "तांदूळ", "मको", "सोयाबीन"], 
        soilTypeOptions: ["रेवाळ", "चिकणमाती", "पोयटा माती", "काळो"],
        soilCharacterOptions: ["मातीची प्रकृती निवडात", "खात्री ना", "काळो", "तांबडो", "हळडो", "भुऱ्या", "व्हड उर्वरता", "उणे उर्वरता"],
        irrigationOptions: ["न्हंय", "बोअरवेल", "पावस", "तळे"], sowingOptions: ["हत्तान", "यंत्रान"],
        cropStageOptions: ["पायरी निवडात", "रोपो", "वनस्पत", "फुला", "कापणी"],
        problemOptions: ["समस्या निवडात", "सारें समस्या", "जल समस्या", "रोग", "कीड", "अनीक"]
    },
    mai: {
        home: 'घर', myFarm: 'हमर खेत', todo: 'काजक सूची', trend: 'स्थानीय प्रवृत्ति', feedback: 'प्रतिक्रिया',
        search: 'खोजु...', websiteLanguage: "वेबसाइटक भाषा:",
        heroTitle: 'कृषि सखी', heroSubtitle: '', heroDate: '', heroBtn: 'किसान केँ नीक बनाबए में मदद',
        voiceInputTitle: "आवाज इनपुट", voiceInputSubtitle: "अपन विवरण अपन स्थानीय भाषामे रिकॉर्ड करु।", 
        formHeading: "फॉर्मक विवरण भरु", formDetailsHeading: "खेतक विवरण", submitBtn: "जमा करु",
        footerSchemes: 'योजना', footerMarketPrices: 'बाजारक दाम', footerContact: 'संपर्क', footerCopy: '© 2025 कृषि सखी. सर्वे अधिकार सुरक्षित अछि।',
        
        locationLabel: "स्थान", landSizeLabel: "भूमि के आकार", cropLabel: "फसल", soilTypeLabel: "माटि के प्रकार",
        soilCharacterLabel: "माटीक चरित्र", irrigationLabel: "सिंचाई स्रोत", sowingLabel: "बुआई प्रकार", 
        sowingDateLabel: "बुआईक तिथि", cropStageLabel: "फसलक चरण", problemLabel: "वर्तमान समस्या", uploadImageLabel: "फोटो अपलोड करु",
        
        locationOptions: ["स्थान चुनु", "ऑटो-डिटेक्ट GPS", "जिला A", "जिला B", "जिला C"],
        landSizeOptions: ["<1 एकड़", "1–5 एकड़", "5+ एकड़"], cropOptions: ["गेहूं", "चाउर", "मकै", "सोयाबीन"], 
        soilTypeOptions: ["रेतीला", "चिखला", "दोमट", "काली"],
        soilCharacterOptions: ["माटीक चरित्र चुनु", "निश्चित नहि", "काली", "लाल", "पियर", "भूरी", "उच्च उर्वरता", "कम उर्वरता"],
        irrigationOptions: ["नहर", "ट्यूबवेल", "वर्षा पर आधारित", "तालाब"], sowingOptions: ["हाथ से", "मशीन से"],
        cropStageOptions: ["चरण चुनु", "पौध", "वनस्पति", "फूल देना", "कटाई"],
        problemOptions: ["समस्या चुनु", "खादक समस्या", "सिंचाईक समस्या", "रोग", "कीट", "दोसर"]
    },
    ne: {
        home: 'गृह पृष्ठ', myFarm: 'मेरो फार्म', todo: 'गर्नुपर्ने काम', trend: 'स्थानीय प्रचलन', feedback: 'प्रतिक्रिया',
        search: 'खोज्नुहोस्...', websiteLanguage: "वेबसाइटको भाषा:",
        heroTitle: 'कृषि सखी', heroSubtitle: '', heroDate: '', heroBtn: 'किसानहरूलाई अझ राम्रो बनाउन मद्दत',
        voiceInputTitle: "आवाज इनपुट", voiceInputSubtitle: "आफ्नो विवरण आफ्नो स्थानीय भाषामा रेकर्ड गर्नुहोस्।", 
        formHeading: "फारमको विवरण प्रविष्ट गर्नुहोस्", formDetailsHeading: "फार्म विवरण", submitBtn: "पेश गर्नुहोस्",
        footerSchemes: 'योजना', footerMarketPrices: 'बजार मूल्य', footerContact: 'सम्पर्क', footerCopy: '© 2025 कृषि सखी. सबै अधिकार सुरक्षित छन्।',
        
        locationLabel: "स्थान", landSizeLabel: "जग्गाको आकार", cropLabel: "बाली", soilTypeLabel: "माटोको प्रकार",
        soilCharacterLabel: "माटोको प्रकार", irrigationLabel: "सिचाइ स्रोत", sowingLabel: "बिउ छर्ने प्रकार", 
        sowingDateLabel: "बिउ छर्ने मिति", cropStageLabel: "बालीको चरण", problemLabel: "हालको समस्या", uploadImageLabel: "फोटो अपलोड गर्नुहोस्",
        
        locationOptions: ["स्थान छान्नुहोस्", "अटो-डि-detect GPS", "जिल्ला A", "जिल्ला B", "जिल्ला C"],
        landSizeOptions: ["<1 एकड", "1–5 एकड", "5+ एकड"], cropOptions: ["गहुँ", "चामल", "मकै", "सोयाबीन"], 
        soilTypeOptions: ["बालुवा", "माटो", "दोमट", "कालो"],
        soilCharacterOptions: ["माटोको प्रकार छान्नुहोस्", "निश्चित छैन", "कालो", "रातो", "पहेंलो", "खैरो", "उच्च उर्वरता", "कम उर्वरता"],
        irrigationOptions: ["नहर", "ट्युबवेल", "वर्षा", "पोखरी"], sowingOptions: ["हातले", "मेसिनले"],
        cropStageOptions: ["चरण छान्नुहोस्", "बिरुवा", "वनस्पति", "फूल फुल्ने", "काट्ने"],
        problemOptions: ["समस्या छान्नुहोस्", "मलको समस्या", "सिंचाइको समस्या", "रोग", "कीरा", "अन्य"]
    }
};
