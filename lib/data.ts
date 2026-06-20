import { VehicleListing, AdvertisementSlot, ShowroomProfile } from '@/types';

export const BANGLADESH_DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh'
];

export const BANGLADESH_DISTRICTS_BY_DIVISION: Record<string, string[]> = {
  Dhaka: ['Dhaka', 'Gazipur', 'Narayanganj', 'Savar', 'Narsingdi', 'Tangail', 'Faridpur', 'Gopalganj', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Madaripur', 'Shariatpur', 'Rajbari'],
  Chittagong: ['Chittagong', "Cox's Bazar", 'Cumilla', 'Feni', 'Noakhali', 'Brahmanbaria', 'Chandpur', 'Lakshmipur', 'Rangamati', 'Khagrachhari', 'Bandarban'],
  Sylhet: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
  Rajshahi: ['Rajshahi', 'Bogra', 'Pabna', 'Naogaon', 'Sirajganj', 'Natore', 'Joypurhat', 'Chapainawabganj'],
  Khulna: ['Khulna', 'Jashore', 'Kushtia', 'Satkhira', 'Bagerhat', 'Meherpur', 'Chuadanga', 'Jhenaidah', 'Magura', 'Narail'],
  Barisal: ['Barisal', 'Bhola', 'Patuakhali', 'Pirojpur', 'Jhalokati', 'Barguna'],
  Rangpur: ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
};

export const BANGLADESH_AREAS_BY_DISTRICT: Record<string, string[]> = {
  // Dhaka Division
  Dhaka: ['Gulshan 1', 'Gulshan 2', 'Banani', 'Dhanmondi', 'Uttara Sector 1-6', 'Uttara Sector 7-18', 'Mirpur 1', 'Mirpur 10', 'Mirpur 11', 'Mirpur 12', 'Mirpur 14', 'Motijheel', 'Tejgaon Industrial Area', 'Mohammadpur', 'Badda', 'Rampura', 'Khilgaon', 'Bashundhara R/A', 'Nikunja', 'Mohakhali', 'Farmgate', 'Wari', 'Lalbagh', 'Old Dhaka', 'Keraniganj', 'Paltan', 'Malibagh', 'Shanti Nagar', 'Jatrabari', 'Dhamrai', 'Dohar', 'Nawabganj'],
  Gazipur: ['Gazipur Sadar', 'Tongi', 'Board Bazar', 'Konabari', 'Joydebpur', 'Chowrasta', 'Sreepur', 'Kaliganj', 'Kaliakair', 'Kapasia'],
  Narayanganj: ['Narayanganj Sadar', 'Chashara', 'Fatullah', 'Siddhirganj', 'Araihazar', 'Sonargaon', 'Rupganj', 'Bandar'],
  Savar: ['Savar Town', 'Ashulia', 'Hemayetpur', 'EPZ', 'Dhamrai', 'Nabinagar', 'Birulia'],
  Narsingdi: ['Narsingdi Sadar', 'Madhabdi', 'Panchdona', 'Shibpur', 'Velanagar', 'Belabo', 'Monohardi', 'Raipura', 'Palash'],
  Tangail: ['Tangail Sadar', 'Mirzapur', 'Elenga', 'Kalihati', 'Gopalpur', 'Basail', 'Bhuapur', 'Delduar', 'Ghatail', 'Madhupur', 'Nagarpur', 'Sakhipur'],
  Faridpur: ['Faridpur Sadar', 'Bhanga', 'Alfadanga', 'Boalmari', 'Charbhadrasan', 'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha'],
  Gopalganj: ['Gopalganj Sadar', 'Tungipara', 'Kotalipara', 'Muksudpur', 'Kashiani'],
  Kishoreganj: ['Kishoreganj Sadar', 'Bhairab', 'Katiadi', 'Bajitpur', 'Karimgonj', 'Itna', 'Mithamain', 'Nikli', 'Austagram', 'Hussainpur', 'Pakundia', 'Tarail'],
  Manikganj: ['Manikganj Sadar', 'Singair', 'Saturia', 'Aricha', 'Daulatpur', 'Ghior', 'Harirampur', 'Shibalaya'],
  Munshiganj: ['Munshiganj Sadar', 'Mawa', 'Sirajdikhan', 'Gajaria', 'Srinagar', 'Lohajang', 'Tongibari'],
  Madaripur: ['Madaripur Sadar', 'Shibchar', 'Kalkini', 'Rajoir'],
  Shariatpur: ['Shariatpur Sadar', 'Naria', 'Zajira', 'Bhedarganj', 'Damudya', 'Gosairhat'],
  Rajbari: ['Rajbari Sadar', 'Goalanda', 'Pangsha', 'Baliakandi', 'Kalukhali'],

  // Chittagong Division
  Chittagong: ['Halishahar', 'GEC Circle', 'Agrabad', 'Panchlaish', 'Nasirabad', 'Chawkbazar', 'Patenga', 'Khulshi', 'Bahaddarhat', 'Lalkhan Bazar', 'Muradpur', 'Sandwip', 'Double Mooring', 'Kotwali', 'Pahartali', 'Hathazari', 'Raozan', 'Fatikchhari', 'Anwara', 'Patiya', 'Boalkhali', 'Sitakunda', 'Mirsharai', 'Lohagara', 'Banshkhali', 'Satkania', 'Rangunia', 'Chandanaish'],
  "Cox's Bazar": ['Cox\'s Bazar Town', 'Kolatoli', 'Inani', 'Teknaf', 'Ukhiya', 'Ramu', 'Chakaria', 'Pekua', 'Moheshkhali', 'Kutubdia'],
  Cumilla: ['Kandirpar', 'Mainamati', 'Laksam', 'Chauddagram', 'Cantonment', 'Paduar Bazar', 'Debidwar', 'Barura', 'Brahmanpara', 'Burichang', 'Chandina', 'Daudkandi', 'Homna', 'Meghna', 'Muradnagar', 'Nangalkot', 'Titas', 'Monohorganj'],
  Feni: ['Feni Sadar', 'Daganbhuiyan', 'Sonagazi', 'Fulgazi', 'Parshuram', 'Chhagalnaiya'],
  Noakhali: ['Maijdee', 'Begumganj', 'Chowmuhani', 'Senbagh', 'Chatkhil', 'Companyganj', 'Hatiya', 'Kabirhat', 'Subarnachar'],
  Brahmanbaria: ['Brahmanbaria Sadar', 'Sarail', 'Ashuganj', 'Kasba', 'Akhaura', 'Bancharampur', 'Bijoynagar', 'Nabinagar', 'Nasirnagar'],
  Chandpur: ['Chandpur Sadar', 'Hajiganj', 'Faridganj', 'Puran Bazar', 'Kachua', 'Matlab North', 'Matlab South', 'Shahrasti', 'Haimchar'],
  Lakshmipur: ['Lakshmipur Sadar', 'Ramganj', 'Raypur', 'Ramgati', 'Kamalnagar'],
  Rangamati: ['Rangamati Sadar', 'Kaptai', 'Sajek', 'Baghaichhari', 'Barkal', 'Kawkhali', 'Belaichhari', 'Langadu', 'Naniarchar', 'Rajasthali'],
  Khagrachhari: ['Khagrachhari Sadar', 'Dighinala', 'Panchhari', 'Ramgarh', 'Guimara', 'Lakshmichhari', 'Mahalchhari', 'Manikchhari'],
  Bandarban: ['Bandarban Sadar', 'Thanchi', 'Ruma', 'Chimbuk', 'Alikadam', 'Lama', 'Naikhongchhari', 'Rowangchhari'],

  // Sylhet Division
  Sylhet: ['Zindabazar', 'Uposhahar', 'Ambarkhana', 'South Surma', 'Kumarpara', 'Shibgonj', 'Dorga Gate', 'Chouhatta', 'Bandar Bazar', 'Pathantula', 'Balaganj', 'Beanibazar', 'Bishwanath', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Zakiganj'],
  Moulvibazar: ['Moulvibazar Sadar', 'Sreemangal', 'Kulaura', 'Barlekha', 'Kamalganj', 'Juri', 'Rajnagar'],
  Habiganj: ['Habiganj Sadar', 'Madhabpur', 'Chunarughat', 'Nabiganj', 'Bahubal', 'Baniachong', 'Lakhai', 'Ajmiriganj'],
  Sunamganj: ['Sunamganj Sadar', 'Chattak', 'Jagannathpur', 'Dirai', 'Dharampasha', 'Dowarabazar', 'Jamalganj', 'Sullah', 'Tahirpur'],

  // Rajshahi Division
  Rajshahi: ['Shaheb Bazar', 'Motihar', 'Boalia', 'Kazihata', 'Rajshahi Court', 'Sopura', 'Upashahar', 'Talaimari', 'Katakhali', 'Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur', 'Paba', 'Puthia', 'Tanore'],
  Bogra: ['Bogra Sadar', 'Sherpur', 'Shajahanpur', 'Santahar', 'Thanthania', 'Dupchanchia', 'Adamdighi', 'Dhunat', 'Gabtali', 'Kahaloo', 'Nandigram', 'Sariakandi', 'Shibganj', 'Sonatola'],
  Pabna: ['Pabna Sadar', 'Ishwardi', 'Santhia', 'Chatmohar', 'Atgharia', 'Bera', 'Faridpur', 'Sujanagar', 'Bhangura'],
  Naogaon: ['Naogaon Sadar', 'Patnitala', 'Dhamoirhat', 'Mahadebpur', 'Atrai', 'Badalgachhi', 'Manda', 'Niamatpur', 'Sapahar', 'Raninagar'],
  Sirajganj: ['Sirajganj Sadar', 'Shahjadpur', 'Ullapara', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Tarash'],
  Natore: ['Natore Sadar', 'Singra', 'Baraigram', 'Lalpur', 'Bagatipara', 'Gurudaspur'],
  Joypurhat: ['Joypurhat Sadar', 'Panchbibi', 'Kalai', 'Akkelpur', 'Khetlal'],
  Chapainawabganj: ['Chapainawabganj Sadar', 'Shibganj', 'Rohanpur', 'Bholahat', 'Nachole'],

  // Khulna Division
  Khulna: ['Boyra', 'Sonadanga', 'Khalishpur', 'Shiromoni', 'Rupsha', 'Daulatpur', 'Satkhira Road', 'Gollamari', 'New Market', 'Batiaghata', 'Dacope', 'Dumuria', 'Koyra', 'Paikgachha', 'Phultala', 'Terokhada'],
  Jashore: ['Jashore Sadar', 'Jessore Cantonment', 'Benapole', 'Jhikargachha', 'Chougacha', 'Abhaynagar', 'Bagherpara', 'Keshabpur', 'Manirampur'],
  Kushtia: ['Kushtia Sadar', 'Kumarkhali', 'Bheramara', 'Khoksa', 'Daulatpur', 'Mirpur'],
  Satkhira: ['Satkhira Sadar', 'Kalaroa', 'Shyamnagar', 'Debhata', 'Assasuni', 'Kaliganj', 'Tala'],
  Bagerhat: ['Bagerhat Sadar', 'Mongla', 'Sharankhola', 'Fakirhat', 'Chitalmari', 'Kachua', 'Mollahat', 'Morrelganj', 'Rampal'],
  Meherpur: ['Meherpur Sadar', 'Mujibnagar', 'Gangni'],
  Chuadanga: ['Chuadanga Sadar', 'Darshana', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
  Jhenaidah: ['Jhenaidah Sadar', 'Kaliganj', 'Kotchandpur', 'Shailkupa', 'Harakunda', 'Maheshpur'],
  Magura: ['Magura Sadar', 'Sreepur', 'Shalikha', 'Mohammadpur'],
  Narail: ['Narail Sadar', 'Lohagara', 'Kalia'],

  // Barisal Division
  Barisal: ['Sadar Road', 'Natullabad', 'Rupatali', 'Chowmatha', 'Sadat Bazar', 'Amtali', 'Kathalpara', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur'],
  Bhola: ['Bhola Sadar', 'Char Fasson', 'Lalmohan', 'Burhanuddin', 'Daulatkhan', 'Manpura', 'Tazumuddin'],
  Patuakhali: ['Patuakhali Sadar', 'Kuakata', 'Galachipa', 'Bauphal', 'Dashmina', 'Dumki', 'Kalapara', 'Mirzaganj', 'Rangabali'],
  Pirojpur: ['Pirojpur Sadar', 'Bhandaria', 'Mathbaria', 'Kawkhali', 'Nazirpur', 'Nesarabad', 'Zianagar'],
  Jhalokati: ['Jhalokati Sadar', 'Rajapur', 'Nalchity', 'Kathalia'],
  Barguna: ['Barguna Sadar', 'Amtali', 'Patharghata', 'Taltali', 'Bamna', 'Betagi'],

  // Rangpur Division
  Rangpur: ['Dhap', 'Cantonment', 'Modern More', 'Radhaballabh', 'Lalbagh', 'Sathibari', 'Mithapukur', 'Kurigram More', 'Badarganj', 'Gangachara', 'Kaunia', 'Pirgachha', 'Pirganj', 'Taraganj'],
  Dinajpur: ['Dinajpur Sadar', 'Hili', 'Parbatipur', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Phulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Nawabganj', 'Khansama'],
  Gaibandha: ['Gaibandha Sadar', 'Gobindaganj', 'Palashbari', 'Phulchhari', 'Sadullapur', 'S दोबारा', 'Sundarganj', 'Saghata'],
  Kurigram: ['Kurigram Sadar', 'Nageshwari', 'Ulipur', 'Bhurungamari', 'Chilmari', 'Phulbari', 'Rajarhat', 'Rajibpur', 'Rowmari'],
  Lalmonirhat: ['Lalmonirhat Sadar', 'Patgram', 'Hatibandha', 'Burimari', 'Aditmari', 'Kaliganj'],
  Nilphamari: ['Nilphamari Sadar', 'Saidpur', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Dimla'],
  Panchagarh: ['Panchagarh Sadar', 'Tetulia', 'Boda', 'Debiganj', 'Atwari'],
  Thakurgaon: ['Thakurgaon Sadar', 'Pirganj', 'Ranisankail', 'Haripur', 'Baliadangi', 'Ruhia'],

  // Mymensingh Division
  Mymensingh: ['Ganginarpar', 'Charpara', 'Town Hall', 'Kewatkhali', 'Patgudam', 'Shambhuganj', 'Valuka', 'Trishal', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Nandail', 'Phulpur', 'TaraKanda'],
  Jamalpur: ['Jamalpur Sadar', 'Dewanganj', 'Sarishabari', 'Melandaha', 'Bakshiganj', 'Islampur', 'Madarganj'],
  Netrokona: ['Netrokona Sadar', 'Mohanganj', 'Kalmakanda', 'Atpara', 'Barhatta', 'Durgapur', 'Khaliajuri', 'Madan', 'Kendua', 'Purbadhala'],
  Sherpur: ['Sherpur Sadar', 'Nalitabari', 'Nakla', 'Jhenaigati', 'Sreebardi']
};

export const BANGLADESH_LOCATIONS: { [key: string]: string[] } = {
  Dhaka: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Dhaka'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Gazipur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Narayanganj'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Savar'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Narsingdi'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Tangail'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Faridpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Gopalganj'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Kishoreganj'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Manikganj'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Munshiganj'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Madaripur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Shariatpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Rajbari']
  ],
  Chittagong: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Chittagong'],
    ...BANGLADESH_AREAS_BY_DISTRICT["Cox's Bazar"],
    ...BANGLADESH_AREAS_BY_DISTRICT['Cumilla'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Feni'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Noakhali'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Brahmanbaria'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Chandpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Lakshmipur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Rangamati'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Khagrachhari'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Bandarban']
  ],
  Sylhet: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Sylhet'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Moulvibazar'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Habiganj'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Sunamganj']
  ],
  Rajshahi: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Rajshahi'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Bogra'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Pabna'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Naogaon'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Sirajganj'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Natore'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Joypurhat'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Chapainawabganj']
  ],
  Khulna: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Khulna'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Jashore'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Kushtia'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Satkhira'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Bagerhat'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Meherpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Chuadanga'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Jhenaidah'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Magura'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Narail']
  ],
  Barisal: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Barisal'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Bhola'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Patuakhali'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Pirojpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Jhalokati'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Barguna']
  ],
  Rangpur: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Rangpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Dinajpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Gaibandha'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Kurigram'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Lalmonirhat'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Nilphamari'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Panchagarh'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Thakurgaon']
  ],
  Mymensingh: [
    ...BANGLADESH_AREAS_BY_DISTRICT['Mymensingh'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Jamalpur'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Netrokona'],
    ...BANGLADESH_AREAS_BY_DISTRICT['Sherpur']
  ]
};

export const VEHICLE_BRANDS = {
  car: ['Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Mitsubishi', 'Suzuki', 'Mazda', 'BMW', 'Audi', 'Mercedes-Benz', 'MG', 'Proton', 'DFSK'],
  bike: ['Yamaha', 'Suzuki', 'Honda', 'Bajaj', 'TVS', 'Hero', 'Royal Enfield', 'Lifan', 'Vespa', 'KTM', 'Kawasaki', 'GPX'],
  commercial: ['TATA', 'Hyundai', 'Isuzu', 'Mahindra', 'Mitsubishi', 'Ashok Leyland', 'Foton'],
  threewheeler: ['Bajaj', 'Mishuk', 'Piaggio', 'Runner', 'TVS'],
  bicycle: ['Veloce', 'Core Project', 'Duranta', 'Phoenix', 'Treck', 'Giant'],
  ev: ['Tesla', 'BYD', 'Neta', 'Wuling', 'BMW i', 'Mercedes-EQ', 'Audi e-tron', 'Hyundai Ioniq', 'Kia EV'],
  service: ['Hybrid Care', 'Paint Tech', 'Engine Care', 'Brake Tune', 'Car Wash', 'AC Chill', 'All Brands'],
  parts: ['Michelin', 'Bridgestone', 'Denso', 'Yamaha Genuine', 'Toyota OEM', 'Mobil1', 'Bosch', 'NGK', 'Exide']
};

export const MOCK_SHOWROOMS: ShowroomProfile[] = [
  {
    id: 'sr_1',
    name: 'Haq Bay Motors',
    logoUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=150&h=150',
    bannerUrl: 'https://images.unsplash.com/photo-1562575214-da9fcf59b907?auto=format&fit=crop&q=80&w=1000',
    location: 'Gulshan 2, Dhaka',
    contactNumber: '01712345678',
    email: 'info@haqbay.com',
    operatingHours: '10:00 AM - 08:30 PM (Sat-Thu)',
    isVerified: true,
    listingsCount: 16,
    featuredCount: 4
  },
  {
    id: 'sr_2',
    name: 'Chittagong Auto Gallery',
    logoUrl: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&q=80&w=150&h=150',
    bannerUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000',
    location: 'GEC Circle, Chittagong',
    contactNumber: '01812345679',
    email: 'ctg_autogallery@gmail.com',
    operatingHours: '09:30 AM - 09:00 PM (Everyday)',
    isVerified: true,
    listingsCount: 9,
    featuredCount: 2
  },
  {
    id: 'sr_3',
    name: 'Wheels & Gears Dhaka',
    logoUrl: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d783?auto=format&fit=crop&q=80&w=150&h=150',
    bannerUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000',
    location: 'Uttara Sector 11, Dhaka',
    contactNumber: '01912987654',
    email: 'contact@wheelsgears.bd',
    operatingHours: '11:00 AM - 09:00 PM (Mon-Sat)',
    isVerified: true,
    listingsCount: 11,
    featuredCount: 3
  }
];

// Helper to format values in Bangladeshi BDT without Lakh format as requested
export const formatBDT = (amount: number, type?: string): string => {
  const formattedFull = amount.toLocaleString('en-IN'); // e.g. 21,50,000 (standard South Asian grouping)
  return `BDT ${formattedFull}`;
};

// 20 Mock Cars Listings
export const MOCK_CARS: VehicleListing[] = [
  {
    id: 'car_1',
    title: 'Toyota Corolla Axio Hybrid G 2018',
    type: 'car',
    brand: 'Toyota',
    model: 'Corolla Axio',
    year: 2018,
    condition: 'Reconditioned',
    price: 2150000,
    originalPrice: 2250000,
    priceFormatted: '21.5 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 42000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Gulshan',
    division: 'Dhaka',
    address: 'Plot #15, Road #113, Gulshan 2, Dhaka (Opposite Haq Bay Plaza)',
    description: 'Freshly imported Toyota Corolla Axio G Grade Hybrid. Features absolute pristine interior, beige color dashboard, multifunction steering wheel, projection LED headlamps, pre-crash safety packages, lane departure warning and keyless push start option. Excellent fuel efficient daily driver.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 342,
    createdAt: '2026-06-02T10:00:00Z',
    userId: 'sr_1'
  },
  {
    id: 'car_2',
    title: 'Honda Civic VTEC Turbo 2021',
    type: 'car',
    brand: 'Honda',
    model: 'Civic',
    year: 2021,
    condition: 'Used',
    price: 3600000,
    originalPrice: 3800000,
    priceFormatted: '36.0 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 18000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Banani',
    division: 'Dhaka',
    description: 'First-hand driven sporty Honda Civic 1.5L Turbo model. Kept in like-new state, entirely serviced by DHS Motors. Beautiful sporty red color, full leather interior, premium sound system, panoramic sunroof and keyless system. Completely untuned and stock custom parts.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Mahmudul Hasan',
    sellerPhone: '01815124355',
    sellerType: 'private',
    isFeatured: true,
    status: 'Approved',
    views: 120,
    createdAt: '2026-06-03T02:30:00Z',
    userId: 'user_101'
  },
  {
    id: 'car_3',
    title: 'Toyota Premio F EX Package 2019',
    type: 'car',
    brand: 'Toyota',
    model: 'Premio',
    year: 2019,
    condition: 'Reconditioned',
    price: 3350000,
    priceFormatted: '33.50 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 38000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'Elegant Toyota Premio F EX. Beautiful pearl white paint, luxurious premium mahogany interior, power-adjustable driver seat, triple projection LED headlights, safety sense. Unregistered, ready for delivery with verified auction sheet grade 4.5A.',
    images: [
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 412,
    createdAt: '2026-06-03T08:15:00Z',
    userId: 'sr_3'
  },
  {
    id: 'car_4',
    title: 'Hyundai Tucson Active 2024',
    type: 'car',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    condition: 'New',
    price: 5200000,
    priceFormatted: '52.00 Lakh BDT',
    engineCapacity: '2000 cc',
    mileage: 50,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Tejgaon',
    division: 'Dhaka',
    description: 'Brand New 2024 Hyundai Tucson. Fully imported and with 5 years of local official warranty. Striking parametric jewel design, 10.25-inch infotainment system, electric parking brake, multi-terrain mode, wireless charging pad and premium comfort seating.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 95,
    createdAt: '2026-06-01T15:45:00Z',
    userId: 'sr_1'
  },
  {
    id: 'car_5',
    title: 'Mitsubishi Outlander 4WD S-AWC 2017',
    type: 'car',
    brand: 'Mitsubishi',
    model: 'Outlander',
    year: 2017,
    condition: 'Used',
    price: 2950000,
    priceFormatted: '29.50 Lakh BDT',
    engineCapacity: '2000 cc',
    mileage: 56000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Halishahar',
    division: 'Chittagong',
    description: 'Superb family SUV in Chittagong. Well-maintained Mitsubishi Outlander 7-Seater 4WD. Soft black leather seats, Rockford Fosgate premium music system, electric tailgate, sunroof and excellent power delivery. Papers updated up to 2027.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Ctg Auto Gallery',
    sellerPhone: '01812345679',
    sellerType: 'showroom',
    showroomName: 'Chittagong Auto Gallery',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 180,
    createdAt: '2026-05-31T11:00:00Z',
    userId: 'sr_2'
  },
  {
    id: 'car_6',
    title: 'Nissan X-Trail Hybrid 2016',
    type: 'car',
    brand: 'Nissan',
    model: 'X-Trail',
    year: 2016,
    condition: 'Used',
    price: 2600000,
    priceFormatted: '26.00 Lakh BDT',
    engineCapacity: '2000 cc',
    mileage: 68000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Dhanmondi',
    division: 'Dhaka',
    description: 'Extremely popular and economical SUV in Dhaka. Emergency brake packing, 360 camera, dual zone AC, leather heated seats, and generous leg space. Highly reliable family vehicle ready for any long-distance inter-city travels.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Tanveer Ahmed',
    sellerPhone: '01912635467',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 78,
    createdAt: '2026-06-01T09:40:00Z',
    userId: 'user_102'
  },
  {
    id: 'car_7',
    title: 'BMW 3 Series 320i M Sport 2018',
    type: 'car',
    brand: 'BMW',
    model: '3 Series',
    year: 2018,
    condition: 'Used',
    price: 5200000,
    priceFormatted: '52.00 Lakh BDT',
    engineCapacity: '2000 cc',
    mileage: 32000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Indulge in authentic enthusiast pleasure. BMW 320i M-Sport with beautiful Estoril Blue factory paint. Full M-Sport bodykit, sports suspension, M-alloy wheels, custom ambient package, Harman Kardon setup. Completely official Executive Motors and tax papers up-to-date.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 520,
    createdAt: '2026-06-03T11:00:00Z',
    userId: 'sr_1'
  },
  {
    id: 'car_8',
    title: 'Toyota Aqua S Grade 2018',
    type: 'car',
    brand: 'Toyota',
    model: 'Aqua',
    year: 2018,
    condition: 'Reconditioned',
    price: 1850000,
    priceFormatted: '18.50 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 46000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Uposhahar',
    division: 'Sylhet',
    description: 'Perfect micro daily commuter for Sylhet narrow roads. Class-leading fuel economy reaching 22-25 km/L. Push start, multi steering, traction control, beautiful black mesh interior. Grade 4 auction sheet verified.',
    images: [
      'https://images.unsplash.com/photo-1622330229197-39c85e4ac552?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Sylhet Car World',
    sellerPhone: '01711654321',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 89,
    createdAt: '2026-06-02T14:30:00Z',
    userId: 'user_103'
  },
  {
    id: 'car_9',
    title: 'Toyota Noah Super GL Hybrid 2019',
    type: 'car',
    brand: 'Toyota',
    model: 'Noah',
    year: 2019,
    condition: 'Reconditioned',
    price: 3650000,
    priceFormatted: '36.50 Lakh BDT',
    engineCapacity: '1800 cc',
    mileage: 39000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'Experience luxury class family touring. 7-Seater spacious microbus, dual automatic scrolling backdoors, captain seating configuration, climate control triple AC, double projection. A great pick for high-class family travels.',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 240,
    createdAt: '2026-06-01T12:00:00Z',
    userId: 'sr_3'
  },
  {
    id: 'car_10',
    title: 'Audi A4 TFSI S-Line 2017',
    type: 'car',
    brand: 'Audi',
    model: 'A4',
    year: 2017,
    condition: 'Used',
    price: 4300000,
    priceFormatted: '43.00 Lakh BDT',
    engineCapacity: '1400 cc',
    mileage: 41000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Stunning Audi A4 S-Line with full Audi Virtual Cockpit dashboard, multi-zone premium auto climatization, Matrix laser flow turn lights. Very fuel efficient with the turbo 1.4-liter engine packages. Absolute stock condition.',
    images: [
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Zubair Al Hasan',
    sellerPhone: '01719876543',
    sellerType: 'private',
    isFeatured: true,
    status: 'Approved',
    views: 312,
    createdAt: '2026-06-03T09:30:00Z',
    userId: 'user_104'
  },
  {
    id: 'car_11',
    title: 'Toyota Allion A15 G-Plus 2018',
    type: 'car',
    brand: 'Toyota',
    model: 'Allion',
    year: 2018,
    condition: 'Reconditioned',
    price: 3150000,
    priceFormatted: '31.50 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 32000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Agrabad',
    division: 'Chittagong',
    description: 'Impeccable premium sedan Toyota Allion A15 G-Plus. Dark wine red, beige leather cockpit, dual lane assist safety system, rear wiper, full nickel trim styling. Original auction auction grade certificate provided.',
    images: [
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Ctg Auto Gallery',
    sellerPhone: '01812345679',
    sellerType: 'showroom',
    showroomName: 'Chittagong Auto Gallery',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 145,
    createdAt: '2026-05-28T04:15:00Z',
    userId: 'sr_2'
  },
  {
    id: 'car_12',
    title: 'Honda Vezel RS Sensing Hybrid 2018',
    type: 'car',
    brand: 'Honda',
    model: 'Vezel',
    year: 2018,
    condition: 'Reconditioned',
    price: 2850000,
    priceFormatted: '28.5 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 49000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Sporty crossover Honda Vezel RS Grade. Full black half-leather premium dynamic interior, body kit, RS leather steering, 17-inch exclusive alloy wheels, extreme stability, paddle-shifters. Ready at port.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 152,
    createdAt: '2026-06-01T07:20:00Z',
    userId: 'sr_1'
  },
  {
    id: 'car_13',
    title: 'Mazda 3 SkyActiv High Grade 2019',
    type: 'car',
    brand: 'Mazda',
    model: 'Mazda 3',
    year: 2019,
    condition: 'Used',
    price: 2750000,
    priceFormatted: '27.50 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 23000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Dhanmondi',
    division: 'Dhaka',
    description: 'Stunning premium soul red Mazda 3. Features premium head-up display (HUD), active lane warning, Bose sounding nodes, electric memory luxury seating. Sparingly used as secondary corporate shuttle.',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Sayeed Ahmed',
    sellerPhone: '01614213567',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 99,
    createdAt: '2026-06-03T01:10:00Z',
    userId: 'user_105'
  },
  {
    id: 'car_14',
    title: 'MG ZS Exclusive SUV 2022',
    type: 'car',
    brand: 'MG',
    model: 'ZS',
    year: 2022,
    condition: 'Used',
    price: 2650000,
    priceFormatted: '26.50 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 14000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'Beautiful bold red MG ZS crossover. Features a giant panoramic glass roof, 10-inch smart digital hub panel with Apple CarPlay, 360-degree surrounding security camera, very healthy tires and suspension.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 184,
    createdAt: '2026-05-30T10:00:00Z',
    userId: 'sr_3'
  },
  {
    id: 'car_15',
    title: 'Suzuki S-Cross Hybrid 2021',
    type: 'car',
    brand: 'Suzuki',
    model: 'S-Cross',
    year: 2021,
    condition: 'New',
    price: 3200000,
    priceFormatted: '32.00 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 120,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Agrabad',
    division: 'Chittagong',
    description: 'Zero mileage fresh Suzuki S-Cross flagship crossover. Premium luxury seats, dynamic digital info dashboard, highly reliable smart hybrid system with incredible mileage and low maintenance overhead.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Ctg Auto Gallery',
    sellerPhone: '01812345679',
    sellerType: 'showroom',
    showroomName: 'Chittagong Auto Gallery',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 74,
    createdAt: '2026-06-01T04:45:00Z',
    userId: 'sr_2'
  },
  {
    id: 'car_16',
    title: 'Proton X70 Premium 2022',
    type: 'car',
    brand: 'Proton',
    model: 'X70',
    year: 2022,
    condition: 'Used',
    price: 3400000,
    priceFormatted: '34.00 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 26000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Banani',
    division: 'Dhaka',
    description: 'Malaysian luxury SUV in excellent layout. Executive Nappa premium leather interior, surrounding 360 air filtration, 9 premium speakers, voice recognition systems. Fully maintained by Proton Bangladesh.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Ariful Islam',
    sellerPhone: '01715421352',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 112,
    createdAt: '2026-06-03T02:00:00Z',
    userId: 'user_106'
  },
  {
    id: 'car_17',
    title: 'DFSK Glory 580 Pro 2021',
    type: 'car',
    brand: 'DFSK',
    model: 'Glory 580',
    year: 2021,
    condition: 'Used',
    price: 2450000,
    priceFormatted: '24.50 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 31000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'The ultimate 7-seater budget SUV. Packed with premium tech like an integrated auto-recording dashcam, smart app connectivity, panoramic skylight, and very powerful air conditioning columns spanning 3 rows.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 104,
    createdAt: '2026-05-29T11:20:00Z',
    userId: 'sr_3'
  },
  {
    id: 'car_18',
    title: 'Mercedes-Benz CLA180 Coupe 2016',
    type: 'car',
    brand: 'Mercedes-Benz',
    model: 'CLA-Class',
    year: 2016,
    condition: 'Used',
    price: 4100000,
    priceFormatted: '41.00 Lakh BDT',
    engineCapacity: '1600 cc',
    mileage: 48000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Striking design coupe sedan featuring frameless side windows, sport alloy rims, alcantara sport seats, dual custom sports exhaust tips, customized glowing interior ventilation ambient lights. True luxury statement.',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 395,
    createdAt: '2026-06-03T10:45:00Z',
    userId: 'sr_1'
  },
  {
    id: 'car_19',
    title: 'Toyota Aqua G LED Premium 2015',
    type: 'car',
    brand: 'Toyota',
    model: 'Aqua',
    year: 2015,
    condition: 'Used',
    price: 1380000,
    priceFormatted: '13.80 Lakh BDT',
    engineCapacity: '1500 cc',
    mileage: 82000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Shaheb Bazar',
    division: 'Rajshahi',
    description: 'Superbly-conditioned used Toyota Aqua G Grade LED. Personally driven by a college professor. Perfect engine and hybrid battery state (tested health over 85%). Suspension incredibly silent. Spotless paper trails.',
    images: [
      'https://images.unsplash.com/photo-1622330229197-39c85e4ac552?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Dr. Rafiqul Anam',
    sellerPhone: '01512435678',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 110,
    createdAt: '2026-06-02T16:00:00Z',
    userId: 'user_107'
  },
  {
    id: 'car_20',
    title: 'Mazda Demio SkyActiv 2017',
    type: 'car',
    brand: 'Mazda',
    model: 'Demio',
    year: 2017,
    condition: 'Used',
    price: 1550000,
    priceFormatted: '15.50 Lakh BDT',
    engineCapacity: '1300 cc',
    mileage: 52000,
    fuelType: 'Octane',
    transmission: 'Automatic',
    location: 'Zindabazar',
    division: 'Sylhet',
    description: 'High quality compact hatchback in vibrant blue styling. SkyActiv motor gives incredible responsiveness paired with 18 km/L fuel efficiency inside busy city grids. Super easy parking. All papers up to date until 2027.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Ahmed Motors Sylhet',
    sellerPhone: '01819765432',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 65,
    createdAt: '2026-06-02T05:30:00Z',
    userId: 'user_108'
  }
];

// 20 Mock Bikes Listings
export const MOCK_BIKES: VehicleListing[] = [
  {
    id: 'bike_1',
    title: 'Yamaha R15 V4 Racing Blue 2023',
    type: 'bike',
    brand: 'Yamaha',
    model: 'R15 V4',
    year: 2023,
    condition: 'Used',
    price: 520000,
    priceFormatted: '5,20,000 BDT',
    engineCapacity: '155 cc',
    mileage: 6200,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'Banani',
    division: 'Dhaka',
    description: 'Pristine Yamaha R15 V4 flagship sports bike. Complete traction control system (TCS), Quick Shifter, Dual-channel ABS system, upside-down front forks (USD). Personally owned, scratchless racing blue color. Double keys available.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Siam Chowdhury',
    sellerPhone: '01715632415',
    sellerType: 'private',
    isFeatured: true,
    status: 'Approved',
    views: 450,
    createdAt: '2026-06-03T10:15:00Z',
    userId: 'user_201'
  },
  {
    id: 'bike_2',
    title: 'Suzuki Gixxer SF Fi ABS 2022',
    type: 'bike',
    brand: 'Suzuki',
    model: 'Gixxer SF',
    year: 2022,
    condition: 'Used',
    price: 275000,
    priceFormatted: '2,75,000 BDT',
    engineCapacity: '155 cc',
    mileage: 11000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'Highly stylish Suzuki Gixxer SF with Fuel Injection (Fi) and Single-channel ABS system. Very well cared for, oil changed every 1000 km (Motul synthetic used). Gorgeous matte black color scheme, dual-disc brakes. First owner.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 310,
    createdAt: '2026-06-03T09:00:00Z',
    userId: 'sr_3'
  },
  {
    id: 'bike_3',
    title: 'Honda CBR 150R Repsol Edition 2021',
    type: 'bike',
    brand: 'Honda',
    model: 'CBR 150R',
    year: 2021,
    condition: 'Used',
    price: 435000,
    priceFormatted: '4,35,000 BDT',
    engineCapacity: '150 cc',
    mileage: 14000,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'Halishahar',
    division: 'Chittagong',
    description: 'Unleash track racing vibes with the premium CBR 150R Repsol livery package. Incredible control, slipper clutch system, dual ABS, inverted gold-plated front forks. Tax and registration papers updated up to 2026.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Ctg Auto Gallery',
    sellerPhone: '01812345679',
    sellerType: 'showroom',
    showroomName: 'Chittagong Auto Gallery',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 195,
    createdAt: '2026-06-01T14:10:00Z',
    userId: 'sr_2'
  },
  {
    id: 'bike_4',
    title: 'Royal Enfield Classic 350 Halcyon 2026',
    type: 'bike',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    year: 2026,
    condition: 'New',
    price: 495000,
    priceFormatted: '4,95,000 BDT',
    engineCapacity: '350 cc',
    mileage: 5,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'The legend has officially arrived in Bangladesh! Royal Enfield Classic 350 in stunning vintage Halcyon Green. Dual channel ABS, classic retro analogue-digital dashboard, absolute masterpiece cruising exhaust thump. Full showroom condition with immediate registration.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 780,
    createdAt: '2026-06-03T11:30:00Z',
    userId: 'sr_1'
  },
  {
    id: 'bike_5',
    title: 'Bajaj Pulsar NS160 Twin Disc FI ABS 2022',
    type: 'bike',
    brand: 'Bajaj',
    model: 'Pulsar NS160',
    year: 2022,
    condition: 'Used',
    price: 195000,
    priceFormatted: '1,95,000 BDT',
    engineCapacity: '160 cc',
    mileage: 16500,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Mirpur',
    division: 'Dhaka',
    description: 'Best naked sports cruiser for commuter enthusiasts. Aggressive perimeter frame, Fuel Injection Engine, underbelly exhaust, single-channel ABS. Best-in-class acceleration. Urgent sale as relocating.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Asifur Rahman',
    sellerPhone: '01914561234',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 142,
    createdAt: '2026-06-02T02:15:00Z',
    userId: 'user_202'
  },
  {
    id: 'bike_6',
    title: 'TVS Apache RTR 160 4V SmartXonnect 2023',
    type: 'bike',
    brand: 'TVS',
    model: 'Apache RTR 160 4V',
    year: 2023,
    condition: 'Used',
    price: 185000,
    priceFormatted: '1,85,000 BDT',
    engineCapacity: '160 cc',
    mileage: 8400,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'Dhanmondi',
    division: 'Dhaka',
    description: 'Latest variant featuring Riding Modes (Urban, Rain, Sport), gorgeous digital display panel, bluetooth connectivity (SmartXonnect) for navigation and call helper alerts, bull-eye LED DRL.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Shahriar Kabir',
    sellerPhone: '01618237465',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 110,
    createdAt: '2026-06-02T11:00:00Z',
    userId: 'user_203'
  },
  {
    id: 'bike_7',
    title: 'Yamaha FZ-S FI V3 Vintage Edition 2022',
    type: 'bike',
    brand: 'Yamaha',
    model: 'FZ-S V3',
    year: 2022,
    condition: 'Used',
    price: 220000,
    priceFormatted: '2,20,000 BDT',
    engineCapacity: '150 cc',
    mileage: 12500,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'Zindabazar',
    division: 'Sylhet',
    description: 'Perfect classic comfort cruiser for everyday commuting in Sylhet. ABS control, FI motor, vintage style brown leather seat, superb rider and pillion comfort. No accident history at all.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Zamil Ahmed',
    sellerPhone: '01712437568',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 75,
    createdAt: '2026-06-01T08:30:00Z',
    userId: 'user_204'
  },
  {
    id: 'bike_8',
    title: 'Vespa VXL 150 Elegante 2024',
    type: 'bike',
    brand: 'Vespa',
    model: 'Vespa VXL',
    year: 2024,
    condition: 'New',
    price: 325000,
    priceFormatted: '3,25,000 BDT',
    engineCapacity: '150 cc',
    mileage: 10,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Brand new premium Italian classic scooter Vespa VXL Elegante 150. Gorgeous beige brown design with custom vintage windscreen, perimeter guard rail and leather seating. Incredibly style statement.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 124,
    createdAt: '2026-05-30T09:00:00Z',
    userId: 'sr_1'
  },
  {
    id: 'bike_9',
    title: 'Yamaha MT-15 V2 Monster Energy 2023',
    type: 'bike',
    brand: 'Yamaha',
    model: 'MT-15',
    year: 2023,
    condition: 'Used',
    price: 410000,
    priceFormatted: '4,10,000 BDT',
    engineCapacity: '155 cc',
    mileage: 7200,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'The ultimate dark warrior. Yamaha MT-15 V2 with gold USD front forks, custom MotoGP Monster Energy decals, quick acceleration ratio, dual ABS. Fully serviced by Yamaha BD.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 420,
    createdAt: '2026-06-03T05:30:00Z',
    userId: 'sr_3'
  },
  {
    id: 'bike_10',
    title: 'Kawasaki Ninja 125 ABS 2022',
    type: 'bike',
    brand: 'Kawasaki',
    model: 'Ninja 125',
    year: 2022,
    condition: 'Used',
    price: 360000,
    priceFormatted: '3,60,000 BDT',
    engineCapacity: '125 cc',
    mileage: 9500,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'GEC Circle',
    division: 'Chittagong',
    description: 'Premium entry-sport bike with original Kawasaki racing lime green paints. High performance 125cc liquid cooled engine, extreme stability ergonomics, sharp racing controls. Perfect condition.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Ctg Auto Gallery',
    sellerPhone: '01812345679',
    sellerType: 'showroom',
    showroomName: 'Chittagong Auto Gallery',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 180,
    createdAt: '2026-05-28T08:15:00Z',
    userId: 'sr_2'
  },
  {
    id: 'bike_11',
    title: 'KTM Duke 125 Absolute Sport 2021',
    type: 'bike',
    brand: 'KTM',
    model: 'Duke',
    year: 2021,
    condition: 'Used',
    price: 310000,
    priceFormatted: '3,10,000 BDT',
    engineCapacity: '125 cc',
    mileage: 18000,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Fiery orange trellis frame KTM Duke 125 European styling. High performance cornering brakes, massive handling feedback. Brand new rear Pirelli tire replaced.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Jamil Hossain',
    sellerPhone: '01712398456',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 135,
    createdAt: '2026-06-01T02:00:00Z',
    userId: 'user_205'
  },
  {
    id: 'bike_12',
    title: 'Suzuki Intruder 150 FI ABS 2021',
    type: 'bike',
    brand: 'Suzuki',
    model: 'Intruder',
    year: 2021,
    condition: 'Used',
    price: 245000,
    priceFormatted: '2,45,000 BDT',
    engineCapacity: '150 cc',
    mileage: 14200,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Shaheb Bazar',
    division: 'Rajshahi',
    description: 'Unique custom muscular cruiser styling with single-channel ABS, injection fuel systems. Wide luxury riding position. Superb comfort on long highway runs.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Imran Khan',
    sellerPhone: '01915467382',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 84,
    createdAt: '2026-05-29T10:00:00Z',
    userId: 'user_206'
  },
  {
    id: 'bike_13',
    title: 'Vespa Elegante 150 Flawless 2022',
    type: 'bike',
    brand: 'Vespa',
    model: 'Vespa Elegante',
    year: 2022,
    condition: 'Used',
    price: 285000,
    priceFormatted: '2,85,000 BDT',
    engineCapacity: '150 cc',
    mileage: 4300,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Dhanmondi',
    division: 'Dhaka',
    description: 'Gently ridden Vespa Elegante. Sparkling metallic blue, classic brown split saddle seats, complete side perimeter guards included. Driven strictly around Dhanmondi local circles.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Farhana Yasmin',
    sellerPhone: '01815124673',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 92,
    createdAt: '2026-06-02T13:45:00Z',
    userId: 'user_207'
  },
  {
    id: 'bike_14',
    title: 'Hero Thriller 160R Refresh 2023',
    type: 'bike',
    brand: 'Hero',
    model: 'Thriller 160R',
    year: 2023,
    condition: 'New',
    price: 204000,
    priceFormatted: '2,04,000 BDT',
    engineCapacity: '160 cc',
    mileage: 2,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Ganginarpar',
    division: 'Mymensingh',
    description: 'Fresh unregistered Hero Thriller 160R with high-performance fuel injection, wide radial rear tires, single channel ABS, aggressive robot headlight aesthetics.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Mymensingh Moto Plaza',
    sellerPhone: '01912435678',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 64,
    createdAt: '2026-06-01T04:15:00Z',
    userId: 'user_208'
  },
  {
    id: 'bike_15',
    title: 'Lifan KPR 150 Sports 2021',
    type: 'bike',
    brand: 'Lifan',
    model: 'KPR 150',
    year: 2021,
    condition: 'Used',
    price: 145000,
    priceFormatted: '1,45,000 BDT',
    engineCapacity: '150 cc',
    mileage: 21000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Boyra',
    division: 'Khulna',
    description: 'Best entry-level affordable liquid cooled sports bike. Keeps incredible high-speed stability on Khulna-Bagerhat highways. Fully stock parts, custom green colors.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Sabbir Ahmed',
    sellerPhone: '01712456382',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 52,
    createdAt: '2026-05-30T02:30:00Z',
    userId: 'user_209'
  },
  {
    id: 'bike_16',
    title: 'Honda CB Hornet 160R ABS 2021',
    type: 'bike',
    brand: 'Honda',
    model: 'Hornet',
    year: 2021,
    condition: 'Used',
    price: 189000,
    priceFormatted: '1,89,000 BDT',
    engineCapacity: '160 cc',
    mileage: 15400,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Sonadanga',
    division: 'Khulna',
    description: 'Robust Honda fuel efficiency matched with ABS handling stability and wide grip tires. Highly reliable commuter, serviced exclusively at Honda authorized wings.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Nahid Chowdhury',
    sellerPhone: '01512435671',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 74,
    createdAt: '2026-06-01T15:20:00Z',
    userId: 'user_210'
  },
  {
    id: 'bike_17',
    title: 'GPX Demon GR160R Fi 2022',
    type: 'bike',
    brand: 'GPX',
    model: 'Demon GR160R',
    year: 2022,
    condition: 'Used',
    price: 320000,
    priceFormatted: '3,20,000 BDT',
    engineCapacity: '160 cc',
    mileage: 8200,
    fuelType: 'Octane',
    transmission: 'Manual',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Immensely aggressive racing design Thai sport bike. Beautiful premium matte gray styling, full-color digital cockpit panel, triple led projector lamps. Excellent exhaust pitch.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 110,
    createdAt: '2026-05-31T03:40:00Z',
    userId: 'sr_1'
  },
  {
    id: 'bike_18',
    title: 'Haojue Suzuki DR160 Sport 2023',
    type: 'bike',
    brand: 'Suzuki',
    model: 'DR160',
    year: 2023,
    condition: 'New',
    price: 240000,
    priceFormatted: '2,40,000 BDT',
    engineCapacity: '160 cc',
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'Unregistered fresh brand new naked sport cruiser Haojue Suzuki DR160. Excellent build quality, inverted front USD forks, aggressive street aerodynamics, massive torque payload.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: false,
    status: 'Approved',
    views: 89,
    createdAt: '2026-05-29T12:00:00Z',
    userId: 'sr_3'
  },
  {
    id: 'bike_19',
    title: 'Bajaj Pulsar 150 Single Disc 2019',
    type: 'bike',
    brand: 'Bajaj',
    model: 'Pulsar 150',
    year: 2019,
    condition: 'Used',
    price: 125000,
    priceFormatted: '1,25,000 BDT',
    engineCapacity: '150 cc',
    mileage: 38000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Natullabad',
    division: 'Barisal',
    description: 'The king of everyday commuting in Bangladesh. Extremely durable, cheap replacement parts, reliable engine compression. Tax token updated up to 2028. Owner selling due to upgrade.',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Zahid Hasan',
    sellerPhone: '01712435672',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 94,
    createdAt: '2026-06-01T06:30:00Z',
    userId: 'user_211'
  },
  {
    id: 'bike_20',
    title: 'TVS Raider 125 Smart commuting 2024',
    type: 'bike',
    brand: 'TVS',
    model: 'Raider 125',
    year: 2024,
    condition: 'New',
    price: 165000,
    priceFormatted: '1,65,000 BDT',
    engineCapacity: '125 cc',
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Ambarkhana',
    division: 'Sylhet',
    description: 'Futuristic 125cc commuter that feels like a sporty 150. TFT digital instrument screen, riding modes, massive fuel economy reaching 65 km/L. Perfect stylish campus bike.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Sylhet Bike Corner',
    sellerPhone: '01819777555',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 110,
    createdAt: '2026-06-02T10:30:00Z',
    userId: 'user_212'
  }
];

// 3 Mock Services
export const MOCK_SERVICES: VehicleListing[] = [
  {
    id: 'service_1',
    title: 'Professional Hybrid Battery Repair & Servicing',
    type: 'service',
    brand: 'All Brands',
    model: 'Hybrid Care',
    year: 2024,
    condition: 'New',
    price: 15000,
    priceFormatted: '15,000 BDT',
    engineCapacity: 'N/A',
    mileage: 0,
    fuelType: 'Hybrid',
    location: 'Tejgaon',
    division: 'Dhaka',
    description: 'Complete hybrid battery diagnostics, individual cells measurement, cell balancing and cleaning, smart cooling fan refurbishment. Highly functional for Aqua, Axio, Prius, Noah, and Vezel. Save money over an expensive full replacement.',
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Haq Bay Motors',
    sellerPhone: '01712345678',
    sellerType: 'showroom',
    showroomName: 'Haq Bay Motors',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 180,
    createdAt: '2026-06-03T09:12:00Z',
    userId: 'sr_1'
  },
  {
    id: 'service_2',
    title: 'Ceramic Coating & Premium Gloss Protection Pack',
    type: 'service',
    brand: 'All Brands',
    model: 'Paint Tech',
    year: 2025,
    condition: 'New',
    price: 24000,
    priceFormatted: '24,000 BDT',
    engineCapacity: 'N/A',
    mileage: 0,
    fuelType: 'Octane',
    location: 'Gulshan',
    division: 'Dhaka',
    description: 'Triple layer 9H hardness ceramic nano-coating. Ultra deep showroom gloss reflections, water and dirt repellency, protection from bird droppings, acid rain, minor scratches, oxidation. Includes 2 maintenance check-ups.',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Glaze & Glow Auto',
    sellerPhone: '01713556677',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 112,
    createdAt: '2026-06-02T15:20:00Z',
    userId: 'user_srv_1'
  }
];

// 3 Mock Parts Listings
export const MOCK_PARTS: VehicleListing[] = [
  {
    id: 'parts_1',
    title: 'Michelin Pilot Sport 5 Tyres - 215/45/R17',
    type: 'parts',
    brand: 'Michelin',
    model: 'Pilot Sport 5',
    year: 2024,
    condition: 'New',
    subCategory: 'Tyres & Wheels',
    partsTarget: 'car',
    price: 14500,
    priceFormatted: '14,500 BDT',
    engineCapacity: 'N/A',
    mileage: 0,
    fuelType: 'Petrol',
    location: 'Uttara',
    division: 'Dhaka',
    description: 'Genuine fresh batch Michelin Pilot Sport 5 max performance street tyres. Unparalleled wet-road traction, precise steering control, noise reduction, and excellent longevity. Fitted perfectly on Honda Civic, Mazda 3, Axios.',
    images: [
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Wheels & Gears Dhaka',
    sellerPhone: '01912987654',
    sellerType: 'showroom',
    showroomName: 'Wheels & Gears Dhaka',
    isShowroomVerified: true,
    isFeatured: true,
    status: 'Approved',
    views: 290,
    createdAt: '2026-06-03T11:45:00Z',
    userId: 'sr_3'
  },
  {
    id: 'parts_2',
    title: 'Denso Iridium Tough Spark Plugs (Pack of 4)',
    type: 'parts',
    brand: 'Denso',
    model: 'Toyota OEM',
    year: 2024,
    condition: 'New',
    subCategory: 'Engine & Performance',
    partsTarget: 'car',
    price: 4500,
    priceFormatted: '4,500 BDT',
    engineCapacity: 'N/A',
    mileage: 0,
    fuelType: 'Octane',
    location: 'Mirpur',
    division: 'Dhaka',
    description: 'Japan imported original Denso Iridium Tough spark plugs. Highly efficient electrode design improves fuel mileage, enables smoother cold starts, and lasts up to 100,000 km.',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600'
    ],
    sellerName: 'Siam Chowdhury',
    sellerPhone: '01715632415',
    sellerType: 'private',
    isFeatured: false,
    status: 'Approved',
    views: 65,
    createdAt: '2026-06-03T10:00:00Z',
    userId: 'user_201'
  }
];

// Procedural listing expander to ensure at least 21+ listings per category with realistic specs and images as requested by user
function expandListingsToTwenty(): VehicleListing[] {
  const result = [...MOCK_CARS, ...MOCK_BIKES, ...MOCK_SERVICES, ...MOCK_PARTS];

  const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal'];
  const locationsMap: Record<string, string[]> = {
    'Dhaka': ['Gulshan', 'Uttara', 'Dhanmondi', 'Mirpur', 'Banasree', 'Tejgaon', 'Badda', 'Mohakhali'],
    'Chittagong': ['Agrabad', 'Halishahar', 'GEC Circle', 'Nasirabad', 'Panchlaish'],
    'Sylhet': ['Zindabazar', 'Uposhahar', 'Amberkhana'],
    'Rajshahi': ['Motihar', 'Boalia'],
    'Khulna': ['Khalishpur', 'Sonadanga'],
    'Barisal': ['Sadat Road']
  };

  const carAdditionsData = [
    { brand: 'Toyota', model: 'Premio F EX', price: 3450000, condition: 'Reconditioned', year: 2021, engine: '1500 cc', fuel: 'Hybrid', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Toyota Premio F EX package in pristine pearl color. Zero scratch, self-imported, low auction grade but original mileage. Fitted with state of art collision alert systems.' },
    { brand: 'Honda', model: 'Civic VTEC Turbo', price: 2950000, condition: 'Used', year: 2018, engine: '1500 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=650', desc: 'Honda Civic VTEC Turbo. Enthusiast owned, highly maintained, always Octane driven. Smooth acceleration with custom stainless pipes and sport alloy rims.' },
    { brand: 'Nissan', model: 'X-Trail Hybrid', price: 3600000, condition: 'Used', year: 2019, engine: '2000 cc', fuel: 'Hybrid', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Family driven Nissan X-Trail. Extremely spacious, clean dark interior with panoramic roof. Comes with original leather layout and dual climate control system.' },
    { brand: 'Mitsubishi', model: 'Outlander SUV', price: 3850000, condition: 'Reconditioned', year: 2020, engine: '2000 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=650', desc: 'Japanese import Mitsubishi Outlander. 7-seater SUV perfect for weekend family outings. High grade LED headlamps and touch response cruise control.' },
    { brand: 'Hyundai', model: 'Tucson Active', price: 3100000, condition: 'Used', year: 2017, engine: '1600 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Hyundai Tucson loaded with premium features. Clean dashboard and fully updated taxes till 2027. Fuel efficiency inside city matches eco standards.' },
    { brand: 'MG', model: 'HS Essence Carbon', price: 2750000, condition: 'Used', year: 2021, engine: '1500 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'MG HS Essence sport SUV. Premium red leather seats, customizable ambient interior lights, spacious legroom and fully responsive infotainment.' },
    { brand: 'BMW', model: '320i M Sport', price: 4600000, condition: 'Used', year: 2015, engine: '2000 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=650', desc: 'BMW 320i M Sport package. Excellent stability, raw German power, electric seating, luxury console, paddle shifters, completely direct steering feedback.' },
    { brand: 'Mercedes-Benz', model: 'C200 Exc', price: 5800000, condition: 'Used', year: 2016, engine: '1600 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=650', desc: 'Mercedes-Benz C200 Executive line. Premium metallic paint, radar collision prevention, pristine beige leather, zero cabin noise, elegant driving mode.' },
    { brand: 'Toyota', model: 'Prado TX L Premium', price: 11500000, condition: 'Used', year: 2018, engine: '2700 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=650', desc: 'Toyota Land Cruiser Prado TX L package. Sunroof, 7 leather seats, genuine visual monitor with surrounding cameras. Full auto climate zones setup.' },
    { brand: 'Toyota', model: 'Fielder WxB Dual', price: 2150000, condition: 'Used', year: 2017, engine: '1500 cc', fuel: 'Hybrid', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Toyota Corolla Fielder WxB Hybrid station wagon. Top package with stylish black glossy finish, safety sensing brakes, and great cargo trunk space.' },
    { brand: 'Suzuki', model: 'Swift Boosterjet Pro', price: 1550000, condition: 'Used', year: 2019, engine: '1000 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Suzuki Swift sport hatch back. Highly responsive turbo engine with incredible mileage. Keyless entry, pushes start button, sleek alloy rims.' },
    { brand: 'Toyota', model: 'Allion A15 G', price: 2350000, condition: 'Used', year: 2016, engine: '1500 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Toyota Allion A15 Package. Regularly maintained using premium mobil oils. Very smooth suspension and robust octane output. Ideal family car.' },
    { brand: 'Audi', model: 'A6 S-Line', price: 6200000, condition: 'Used', year: 2017, engine: '1800 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=650', desc: 'Audi A6 S-Line Matrix sedan. Completely executive ride with dynamic matrix sweeps, virtual cockpit glass clusters, soft close luxury doors.' },
    { brand: 'Mazda', model: '3 SkyActiv', price: 1950000, condition: 'Used', year: 2016, engine: '1500 cc', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Mazda 3 sports sedan loaded with sleek digital display, active head-up dashboard projector and G-Vectoring control system.' },
    { brand: 'Toyota', model: 'Aqua G Sports', price: 1680000, condition: 'Used', year: 2018, engine: '1500 cc', fuel: 'Hybrid', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=650', desc: 'Toyota Aqua G Sports edition. Custom aggressive bodykits, alcantara sports bucket seats, extreme 28 km/L fuel efficiency indices inside traffic.' }
  ];

  const bikeAdditionsData = [
    { brand: 'Yamaha', model: 'FZS V3 Deluxe Matte', price: 255000, condition: 'Used', year: 2022, engine: '150 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'Yamaha FZS V3 Deluxe in elegant blue colour. Comes with dual ABS brake system, completely fresh tyres, zero scratch and single handed use.' },
    { brand: 'Suzuki', model: 'Gixxer SF FI ABS Mono', price: 295000, condition: 'Used', year: 2021, engine: '155 cc', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=650', desc: 'Suzuki Gixxer SF FI ABS. Fuel injection keeps output completely consistent. Matte black finish, sporty visual posture, and extreme road corner stability.' },
    { brand: 'Honda', model: 'CBR 150R Repsol', price: 460000, condition: 'Used', year: 2022, engine: '150 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'Honda CBR 150R racing edition. Exceptionally responsive liquid-cooled engine, full digital console, gold inverted forks, dual ABS brakes.' },
    { brand: 'Yamaha', model: 'R15 V4 Racing Blue Line', price: 565000, condition: 'New', year: 2024, engine: '155 cc', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=650', desc: 'Brand new import Yamaha R15 V4. Packed with quick shifter, traction control system, assistive slip clutch, aggressive fairing aesthetics.' },
    { brand: 'TVS', model: 'Apache RTR 160 4V Special', price: 215500, condition: 'Used', year: 2022, engine: '160 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'Apache RTR 160 4V with Smartxonect dashboard Bluetooth integration. Multiple riding modes for rain, urban commuting, or high performance sports.' },
    { brand: 'Bajaj', model: 'Pulsar NS160 twin-disc', price: 245000, condition: 'Used', year: 2020, engine: '160 cc', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=650', desc: 'Bajaj Pulsar NS160 fuel injection variant. Clean muscular tank shroud with dual channel braking security. Extremely punchy mid-range speed torque.' },
    { brand: 'Royal Enfield', model: 'Classic 350 Cruise', price: 540000, condition: 'New', year: 2024, engine: '350 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'Original Royal Enfield Classic 350 chrome edition. Distinctive thump sound, signature vintage analog console, incredibly smooth cruising setup.' },
    { brand: 'TVS', model: 'Raider 125 Tech', price: 165000, condition: 'Used', year: 2023, engine: '125 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'TVS Raider 125 commuter bike. Exceptionally light model, brilliant fuel efficiency, colored TFT dashboard, single-disc front brakes.' },
    { brand: 'Vespa', model: 'VXL 150 Chromo', price: 310000, condition: 'Used', year: 2021, engine: '150 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'Italian premium Vespa scooter. Retro vintage look, full metal monocoque chassis, alloy wheels with safe disc brakes layout. Perfect for city rides.' },
    { brand: 'KTM', model: 'Duke 200 ABS', price: 385000, condition: 'Used', year: 2021, engine: '200 cc', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=650', desc: 'KTM Duke 200 FI orange edition. Explosive torque acceleration, lightweight trellis frame, premium WP apex suspension shocks. Very agile street cruiser.' },
    { brand: 'Yamaha', model: 'MT-15 V2', price: 425000, condition: 'Used', year: 2023, engine: '155 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'Yamaha MT-15 V2 Dark Warrior edition. Hyper-naked design featuring inverted premium suspension forks, high-grip radial rear tyres and bluetooth metrics.' },
    { brand: 'Suzuki', model: 'Intruder 150 FI', price: 235000, condition: 'Used', year: 2020, engine: '150 cc', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=650', desc: 'Suzuki Intruder 150 modern cruiser. MUSCULAR posture with extremely relaxing cushioned seats. Single channel ABS system for robust stopping security.' },
    { brand: 'GPX', model: 'Demon GR165R', price: 315000, condition: 'Used', year: 2021, engine: '165 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'GPX Demon GR165R sport performance. Head-turner design element, fuel-injected water cooled power system, full LED headlights clusters.' },
    { brand: 'Lifan', model: 'KPR 165 Carb', price: 185000, condition: 'Used', year: 2019, engine: '165 cc', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=650', desc: 'Lifan KPR 165 liquid cooled warrior. Renowned for raw speed thrusting power in highway conditions, sporty clip-on handlebars.' },
    { brand: 'Yamaha', model: 'Ray ZR Street Rally', price: 195000, condition: 'Used', year: 2022, engine: '125 cc', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=650', desc: 'Yamaha Ray ZR Street Rally scooter. Tough off-road-style tyres, knuckle guards, hybrid power assist motor system, extremely light chassis.' }
  ];

  const serviceAdditionsData = [
    { title: 'Full Mechanical Diagnostics & Engine Tuning', provider: 'SpeedWorks Garage', price: 4500, phone: '01819776655', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Comprehensive digital engine scanners to identify error codes. Manual spark plug, injector wash, fuel flow sensor calibration and dynamic sound test.' },
    { title: 'Executive Interior Detailing & Sanitization', provider: 'AutoSpa Bangladesh', price: 8500, phone: '01715886677', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'Deep extraction cleaning for leather and fabric interior seats. Roof liner stain removal, antibacterial steam ionization, glossy dashboard polishing.' },
    { title: 'Automatic Gearbox Fluid Flush & Re-calibration', provider: 'TransGear Labs', price: 16000, phone: '01913998822', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'High pressure automatic transmission fluid (ATF) flushing. Complete line cleaning, replacement gasket sealing, and gear solenoid diagnostic tuning.' },
    { title: '3D Laser Wheel Alignment & Balancing Combo', provider: 'Hunter Alignment Point', price: 2200, phone: '01712223344', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Advanced 3D camera sensors calibrate perfect toe, camber and caster metrics. Complete alloy wheel tyre weight balancing for vibration free rides.' },
    { title: 'Optical Premium Dent Painting & Panel Healing', provider: 'Showroom Glass Works', price: 9500, phone: '01713554433', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'Paint scraper paint chip restoration or bumper dent pulling. Matches factory color codes exactly using computer mixing and bakes premium coatings.' },
    { title: 'AC Evaporator Core Leak Repair & Gas Recharge', provider: 'CoolWay Air Conditioning', price: 6500, phone: '01833556611', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'AC cooling core leakage testing, evaporator replacement, high grade vacuum dehydration, and genuine R134a refrigerant gas recharge.' },
    { title: 'Brake Rotor Resurfacing & Pad Installation', provider: 'Dhaka Brake Point', price: 3000, phone: '01711223355', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Worn or squeaking brake rotors are perfectly resurfaced on heavy grade lathes. Price includes safety fitting of synthetic pads for max grip.' },
    { title: 'Premium Body Wash, Vacuuming & Liquid Waxing', provider: 'Chaka Wash Hub', price: 1200, phone: '01912554433', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'Thorough foam washing of undercarriage and body panels. Deep trunk vacuum cleaning, mirror glass wash, protective shiny carnauba liquid wax coat.' },
    { title: 'Active Suspension Shock Absorber Overhaul', provider: 'Chassis Masters', price: 14050, phone: '01712556633', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Worn out shock absorber replacement with genuine KYB strut packs. Bushings, linkages, and stabilizer bars greasing for factory smooth comfort.' },
    { title: 'Hybrid Battery Cell Cleaning & Refurbishment', provider: 'Hybrid Care BD', price: 22000, phone: '01719998822', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Individual hybrid battery module diagnosis. Chemical scale cleaning, cell balancing, voltage output testing of Toyota Hybrid packs.' },
    { title: 'Complete Car Electrical Wiring & ECU Doctoring', provider: 'Volt Garage Corp', price: 5000, phone: '01813442211', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Short circuit tracking, ECU repair, power window motors lubrication and repair, and headlight relay configuration with safe fuses.' },
    { title: 'Upholstery Premium Leather Seat Stitching', provider: 'Car Comfort Interiors', price: 18000, phone: '01714553322', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'Custom tailored synthetic leather seat covers with double stitching layout. Includes padded armrests, door panel matching and shift boots.' },
    { title: 'Professional Muffler & Sports Exhaust Fitting', provider: 'Bangla Exhaust Hub', price: 8000, phone: '01912443311', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Performance exhaust piping modification. Deep throttle muffler welding with zero backpressure drops for cars and motorbikes.' },
    { title: 'Comprehensive Road Side Emergency Tow Services', provider: 'Rescue Towing Ltd', price: 3500, phone: '01712448833', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Active 24/7 flatbed emergency tow support anywhere in Greater Dhaka. Low clearance safe hydraulic lifts for luxury and low stance cars.' },
    { title: 'Sunroof Gasket Water Leakage Repair Service', provider: 'Retrofit Dhaka', price: 4500, phone: '01712499553', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'Clogged sunroof drain pipe extraction cleaning, UV chemical weather stripping replacement, and high pressure water seal tests.' },
    { title: 'Custom Projector LED Retrofitting Pack', provider: 'Neon Lights BD', price: 12500, phone: '01718877553', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'Bixenon projector setups with premium crystal ring halos. Multiplied nighttime visual clarity with precise sharp high cutoff lines.' },
    { title: 'Anti Rust Undercarriage Tar Coating Protection', provider: 'DuraCoat Labs', price: 3500, phone: '01718822551', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=650', desc: 'Heavy duty asphalt rubberized paint undercoat protecting metal from salt roads, excessive rainfall mud, and minor gravel strikes.' },
    { title: 'Odor Removers & AC Ventilation Disinfection', provider: 'Health Care Auto', price: 2000, phone: '01714422998', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=650', desc: 'Deep mist ozone aeration in vents killing food smells, tobacco smoke odors, persistent damp mildew and airborne bacteria.' }
  ];

  const partAdditionsData = [
    { title: 'Bosch Double Platinum Spark Plugs (Pack of 4)', brand: 'Bosch', model: 'Platinum Plus', price: 3800, phone: '01713554488', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Bosch original double platinum line spark plugs. Resists spark-erosion and thermal shocking, maintaining high mileage outputs for over 60,000 km.', subCategory: 'Engine & Performance', partsTarget: 'car' },
    { title: 'Toms High Performance Racing Air Filter', brand: 'Toms', model: 'Super Flow', price: 6500, phone: '01819553311', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'High performance washable cotton element. Direct drop-in filter increases intake engine airflow volume, introducing extra horsepower responses.', subCategory: 'Engine & Performance', partsTarget: 'car' },
    { title: 'EBC Redstuff Ceramic Front Brake Pads', brand: 'EBC', model: 'Redstuff Premium', price: 12500, phone: '01719553377', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Premium ceramic front pads with zero black brake dust. Strong initial cold bite reaction, quiet stopping blocks, built for high speed sedans.', subCategory: 'Brakes & Rotors', partsTarget: 'car' },
    { title: 'Mobil 1 Extended Performance 5W-30 (4L)', brand: 'Mobil', model: '1 EP Synthetic', price: 5600, phone: '01912553344', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600', desc: '100% advanced full synthetic motor oil. Protects critical engines from sludge build-up for up to 15,005 miles. Excellent low-temp behaviors.', subCategory: 'Fluids & Lubricants', partsTarget: 'car' },
    { title: 'Castrol Power1 Ultimate 10W-40 4T (1L)', brand: 'Castrol', model: 'Power1 4T', price: 1250, phone: '01712443311', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600', desc: 'High performance 4-stroke bike oil. Formula 5-in-1 outstanding acceleration, extreme engine cooling protection under high loads, minimizes friction.', subCategory: 'Fluids & Lubricants', partsTarget: 'bike' },
    { title: 'NGK G-Power Alloy Spark Plug for Bikes', brand: 'NGK', model: 'G-Power CPR7EGP', price: 450, phone: '01711223344', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Platinum alloy spark plug for Yamahas, Hondas and Suzukis. Superior fuel economy, stable idle RPM patterns, quick combustion starts.', subCategory: 'Bike Engine & Exhaust', partsTarget: 'bike' },
    { title: 'Yokohama BlueEarth-GT AE51 Tyre - 195/65/R15', brand: 'Yokohama', model: 'BlueEarth-GT', price: 8800, phone: '01713552211', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600', desc: 'Fuel efficient Grand Touring tyre for Toyota Axio, Allion, Premio, Honda Grace. Reduced fuel consumption with premium wet grip handling.', subCategory: 'Tyres & Wheels', partsTarget: 'car' },
    { title: 'Original Pioneer DMH-A4450BT Infotainment', brand: 'Pioneer', model: 'DMH-A4450BT', price: 21000, phone: '01714652311', image: 'https://images.unsplash.com/photo-1557804506-6fd96a1a44e1?auto=format&fit=crop&q=80&w=600', desc: 'Pioneer 6.8 inch double-din touchscreen with wired Apple CarPlay & Android Auto support. Smooth touch responses and superb sound equalizer boards.', subCategory: 'Electrical & Audio', partsTarget: 'car' },
    { title: 'Hella Chrome Twin Horn Trumpet Kit', brand: 'Hella', model: 'Chrome Twin', price: 1850, phone: '01912556633', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Compact dual tone trumpet horns with sports chrome grille grills. Crisp projection sound output level reaches 110dB for premium presence on streets.', subCategory: 'Electrical & Audio', partsTarget: 'car' },
    { title: 'Osram Night Breaker 200 H4 Bulbs (Pair)', brand: 'Osram', model: 'Night Breaker', price: 4200, phone: '01712554433', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Up to 200% brighter halogen beam bulbs. Casts throw up to 150 meters further down dark roads. Fully OEM road legal plug-and-play bulbs.', subCategory: 'Electrical & Audio', partsTarget: 'car' },
    { title: 'K&N Universal Clamp-On Air Filter For Bikes', brand: 'K&N', model: 'Universal', price: 3500, phone: '01711225577', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'Original USA imported K&N air filters for sports bike performance upgrades. Maximizes fuel combustion flows, cleanable and reusable elements.', subCategory: 'Bike Engine & Exhaust', partsTarget: 'bike' },
    { title: 'KYB Excel-G Rear Shock Strut For Toyota Allion', brand: 'KYB', model: 'Excel-G Rear', price: 14000, phone: '01912556677', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Twin-tube gas struts restabilizing comfort suspension levels. Highly durable seals lock fluid leakage out even under heavy Bangladesh street potholes.', subCategory: 'Suspension & Steering', partsTarget: 'car' },
    { title: 'Koni Special Active Struts Front Pair', brand: 'Koni', model: 'Special Active', price: 42000, phone: '01714552211', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'FSD (Frequency Selective Damping) smart valve mechanics. Reacts on high speed road surface inputs smoothly. For Audi, BMW and Honda Civics.', subCategory: 'Suspension & Steering', partsTarget: 'car' },
    { title: 'Brembo Premium Ceramic Rear Brake Pads Set', brand: 'Brembo', model: 'P0 6003N', price: 5500, phone: '01711226655', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'OEM performance Brembo composite brake pads. Superior heat dispersion resistance prevents fade on mountain roads. Unmatched stopping security.', subCategory: 'Brakes & Rotors', partsTarget: 'car' },
    { title: '3M Car Wash Shampoo & Wax Liquid (1L)', brand: '3M', model: 'Shampoo Wax 1L', price: 850, phone: '01913554488', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600', desc: 'Concentrated car wash rich foam cleans road grime, grease, and spots without stripping off waxes. Deep wax visual gloss shine leaves protection.', subCategory: 'Fluids & Lubricants', partsTarget: 'car' },
    { title: 'Kevlar Reinforced CVT Drive Belt for Scooters', brand: 'Bando', model: 'Kevlar Drive', price: 2800, phone: '01712334411', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'Genuine Bando Kevlar reinforced heavy duty scooter belts. Zero slippage issues and prevents belt degradation over high heat outputs inside city.', subCategory: 'Chains & Transmission', partsTarget: 'bike' },
    { title: 'Did Gold Heavy Duty Bike Chain 120 Links', brand: 'DID', model: 'Gold X-Ring 520', price: 3500, phone: '01912113322', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'DID premium series X-ring drive chain links. Extremely high tensile strength and minimal stretch expansion ratios for long-distance cruising.', subCategory: 'Chains & Transmission', partsTarget: 'bike' },
    { title: 'Engine Mount Bushings set (Full Kit)', brand: 'Toyota OEM', model: 'S-Grade Mounts', price: 9500, phone: '01819776655', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Heavy duty rubberized engine mount inserts. Dramatically reduces custom cabin vibrations and re-establishes pristine factory quietness.', subCategory: 'Suspension & Steering', partsTarget: 'car' },
    { title: 'Premium LED Headlight projector Assembly', brand: 'Yamaha Genuine', model: 'H4-Pro LED', price: 8500, phone: '01715886677', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600', desc: 'Ultra-bright projector headlights cluster setup for motorbikes. Precision white lighting projection beams cut down dark highways smoothly.', subCategory: 'Lights & Indicators', partsTarget: 'bike' },
    { title: 'Sport Carbon Fiber Front lip Splitter spoiler', brand: 'Toyota OEM', model: 'Custom split v2', price: 16500, phone: '01913998822', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600', desc: 'Genuine high gloss dry carbon design front splitter lips. Increases stability downforces while giving your sedan an exceptionally aggressive stance.', subCategory: 'Body & Accessories', partsTarget: 'car' },
    { title: 'MRF Masseter Back Tyre for Sports Bikes', brand: 'MRF', model: 'Masseter FX', price: 4800, phone: '01711223344', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'Premium radial rear tyre for high stability lean angles and water-channeling grooves.', subCategory: 'Bike Tyres & Wheels', partsTarget: 'bike' },
    { title: 'Denso Iridium Tough Spark Plugs PK20TT (Pack of 4)', brand: 'Denso', model: 'Iridium Tough', price: 4500, phone: '01711223344', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'High performance iridium alloy spark plugs with platinum tip. Highly reliable ignition sparks, reduces fuel consumption by up to 5%.', subCategory: 'Engine & Performance', partsTarget: 'car' },
    { title: 'Yamaha FZ Version 3 Front Disc Plate', brand: 'Yamaha Genuine', model: 'FZ v3 Disc', price: 2600, phone: '01715886677', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'Original stainless steel alloy front brake rotor for Yamaha FZ S V3. Optimal heat dissipation, avoids vibration warping during hard emergency stops.', subCategory: 'Bike Brakes & Safety', partsTarget: 'bike' },
    { title: 'Renthal Fatbar Handlebar Black for Dirt Bikes', brand: 'Renthal', model: 'Fatbar Carbon', price: 7500, phone: '01912556677', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'Braced handlebars with high strength aluminum alloy taper wall tubing. Provides ultimate strength-to-weight outputs and vibration damping.', subCategory: 'Riding Accessories', partsTarget: 'bike' },
    { title: 'SuperSprox Gold Rear Alloy Sprocket for Yamaha R15', brand: 'SuperSprox', model: 'Alloy Gold 47T', price: 4200, phone: '01815667799', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'CNC-machined gold lightweight anodized rear drive sprocket. Perfect link match with 428 pitch chains, improves initial torque acceleration.', subCategory: 'Chains & Transmission', partsTarget: 'bike' },
    { title: 'Liqui Moly CeraTec Friction Modifier (300ml)', brand: 'Liqui Moly', model: 'CeraTec Ceramic', price: 2400, phone: '01712443311', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600', desc: 'Micro-ceramic lubricant suspension compound coating internal metal surfaces. Drastically minimizes heat, metallic friction, and component wear.', subCategory: 'Fluids & Lubricants', partsTarget: 'car' },
    { title: 'Exedy Stage 1 Organic Clutch Disc Plate for Civic', brand: 'Exedy', model: 'Stage 1 Organic', price: 18500, phone: '01913998822', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'High-friction organic clutch disc built with premium asbestos-free linings. Maintains comfortable street drivability with faster engagement pressure.', subCategory: 'Engine & Performance', partsTarget: 'car' },
    { title: 'Alpinestars SMX-1 Air V2 Summer Gloves', brand: 'Alpinestars', model: 'SMX-1 Air v2', price: 6800, phone: '01912113322', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600', desc: 'Lightweight summer mesh riding gloves with carbon hard knuckle guards. Reinforced palm zone for superior abrasion safety protection.', subCategory: 'Riding Accessories', partsTarget: 'bike' },
    { title: 'Meguiars Ultimate liquid Paint Wax Coat (473ml)', brand: 'Meguiars', model: 'Ultimate Liquid', price: 2450, phone: '01713554488', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600', desc: 'Pure synthetic polymer wax formula delivering incredible deep mirror-gloss shine and outstanding water-beading action protection.', subCategory: 'Fluids & Lubricants', partsTarget: 'car' },
    { title: 'Depo Smoke LED Tail Light Set for Corolla', brand: 'Depo', model: 'LED Tail Lamp', price: 15500, phone: '01718877553', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600', desc: 'Full LED smoking lens tail lights cluster. Elegant fiber optic glowing lightbars and sequential indicator lights for modern visual aesthetics.', subCategory: 'Electrical & Audio', partsTarget: 'car' },
    { title: 'GREDDY Aluminum Radiator Cap High Pressure', brand: 'Greddy', model: 'High Press 1.3 Bar', price: 1800, phone: '01719553377', image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', desc: 'Durable anodized blue aluminum radiator pressure cap. Restricts water boiling temperature higher, improving racing cooling efficiency.', subCategory: 'Engine & Performance', partsTarget: 'car' },
    { title: 'KYT Striker Solid Full Face Matte Helmet', brand: 'KYT', model: 'Striker SV', price: 5800, phone: '01711223344', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600', desc: 'Sleek matte design motorcycle protective helmet with drop-down sun visor shield, emergency quick release cheek pads, and high stability rear spoiler.', subCategory: 'Bike Accessories', partsTarget: 'bike' },
    { title: '7D Premium Waterproof Dual Stitch Car Floor Mats', brand: 'Toyota OEM', model: '7D Deluxe', price: 6500, phone: '01912554488', image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=600', desc: 'Custom cut premium quality PU leather floor protection. Triple-bound stitches traps dust, mud, sand, and liquids. Extremely easy wash-offs.', subCategory: 'Car Accessories', partsTarget: 'car' },
    { title: 'Super-Bright USB Rechargeable Bicycle LED Light Set', brand: 'Exide', model: 'Light-Go Pro 300', price: 1250, phone: '01911442299', image: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&q=80&w=600', desc: 'Waterproof high luminance LED headlight paired with highly flashing back alert tail lights. Rechargeable battery operates for up to 10 hours.', subCategory: 'Bicycle Accessories', partsTarget: 'bike' }
  ];

  // Seed cars up to 21+ elements
  carAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_car_${idx + 1}`,
      title: add.brand + ' ' + add.model + ' ' + add.year,
      type: 'car',
      brand: add.brand,
      model: add.model,
      year: add.year,
      condition: add.condition as any,
      price: add.price,
      priceFormatted: formatBDT(add.price),
      engineCapacity: add.engine,
      mileage: 12000 + idx * 4500,
      fuelType: add.fuel as any,
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: 'Karim Motors Group',
      sellerPhone: add.brand === 'Toyota' ? '01712334411' : '01925667788',
      sellerType: idx % 3 === 0 ? 'showroom' : 'private',
      showroomName: idx % 3 === 0 ? 'Haq Bay Motors' : undefined,
      isShowroomVerified: idx % 3 === 0 ? true : undefined,
      isFeatured: idx % 4 === 0,
      status: 'Approved',
      views: 70 + idx * 12,
      createdAt: `2026-06-03T08:${idx + 10}:00Z`,
      userId: idx % 3 === 0 ? 'sr_1' : `user_gen_c_${idx}`
    });
  });

  // Seed bikes up to 21+ elements
  bikeAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_bike_${idx + 1}`,
      title: add.brand + ' ' + add.model + ' ' + add.year,
      type: 'bike',
      brand: add.brand,
      model: add.model,
      year: add.year,
      condition: add.condition as any,
      price: add.price,
      priceFormatted: add.price.toLocaleString() + ' BDT',
      engineCapacity: add.engine,
      mileage: 3500 + idx * 1500,
      fuelType: 'Petrol',
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: 'Bike & Gear Arena',
      sellerPhone: '01815667799',
      sellerType: idx % 3 === 0 ? 'showroom' : 'private',
      showroomName: idx % 3 === 0 ? 'Haq Bay Motors' : undefined,
      isShowroomVerified: idx % 3 === 0 ? true : undefined,
      isFeatured: idx % 4 === 1,
      status: 'Approved',
      views: 40 + idx * 9,
      createdAt: `2026-06-03T07:${idx + 12}:00Z`,
      userId: idx % 3 === 0 ? 'sr_1' : `user_gen_b_${idx}`
    });
  });

  // Seed services up to 20+ elements
  serviceAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_service_${idx + 1}`,
      title: add.title,
      type: 'service',
      brand: 'All Brands',
      model: 'Service Specialist',
      year: 2026,
      condition: 'New',
      price: add.price,
      priceFormatted: add.price.toLocaleString() + ' BDT',
      engineCapacity: 'N/A',
      mileage: 0,
      fuelType: 'Octane',
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: add.provider,
      sellerPhone: add.phone,
      sellerType: idx % 3 === 0 ? 'showroom' : 'private',
      isFeatured: idx % 5 === 2,
      status: 'Approved',
      views: 35 + idx * 8,
      createdAt: `2026-06-02T12:${idx + 15}:00Z`,
      userId: `user_gen_s_${idx}`
    });
  });

  // Seed parts up to 20+ elements
  partAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_part_${idx + 1}`,
      title: add.title,
      type: 'parts',
      brand: add.brand,
      model: add.model,
      year: 2026,
      condition: 'New',
      subCategory: add.subCategory,
      partsTarget: (add.partsTarget === 'car' || add.partsTarget === 'bike') ? add.partsTarget : undefined,
      price: add.price,
      priceFormatted: add.price.toLocaleString() + ' BDT',
      engineCapacity: 'N/A',
      mileage: 0,
      fuelType: 'Octane',
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: 'Genuine Spares BD',
      sellerPhone: add.phone,
      sellerType: idx % 3 === 0 ? 'showroom' : 'private',
      isFeatured: idx % 5 === 1,
      status: 'Approved',
      views: 22 + idx * 6,
      createdAt: `2026-06-03T11:${idx + 5}:00Z`,
      userId: `user_gen_p_${idx}`
    });
  });

  // Seed Commercial Vehicles (commercial)
  const commercialAdditionsData = [
    { brand: 'TATA', model: 'Ace EX 1ton PickUp', price: 920000, condition: 'Used', year: 2022, engine: '1400 cc', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=650', desc: 'TATA EX pickup with solid loading bay. Perfect for logistics, short shipping, and local transport. Regularly serviced with high fuel efficiency.' },
    { brand: 'Hyundai', model: 'Porter II Super Cab', price: 1750000, condition: 'Reconditioned', year: 2021, engine: '2500 cc', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=650', desc: 'Hyundai Porter II High Deck cabin. Fitted with double cooling vents, spacious cab seating, original high load capacity. Imported directly from Korea.' },
    { brand: 'Isuzu', model: 'Elf Box Truck 2-Ton', price: 2100000, condition: 'Used', year: 2017, engine: '3000 cc', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=650', desc: 'Enclosed delivery box truck suitable for food transport and electronic goods. Durable shutter back door, smooth air suspension brakes, fully updated tax papers.' },
    { brand: 'Mahindra', model: 'Maxximo Pick-Up', price: 780000, condition: 'Used', year: 2020, engine: '1000 cc', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=650', desc: 'Mahindra local commercial carrier pickup. Very responsive steering, outstanding torque, and incredibly light frame. Excellent model for narrow roads.' },
    { brand: 'Mitsubishi', model: 'Fuso Canter 3-Ton', price: 2600000, condition: 'Used', year: 2018, engine: '3900 cc', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=650', desc: 'Mitsubishi Fuso Canter cargo truck. Heavy-duty chassis built with reinforced steel plates. Perfect for heavy steel rods, cement bags, or shipping loads.' }
  ];

  commercialAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_commercial_${idx + 1}`,
      title: add.brand + ' ' + add.model + ' ' + add.year,
      type: 'commercial',
      brand: add.brand,
      model: add.model,
      year: add.year,
      condition: add.condition as any,
      price: add.price,
      priceFormatted: formatBDT(add.price),
      engineCapacity: add.engine,
      mileage: 45000 + idx * 8000,
      fuelType: add.fuel as any,
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: 'Karwan Bazar Truck Agent Ltd',
      sellerPhone: '01712443311',
      sellerType: idx % 2 === 0 ? 'showroom' : 'private',
      isFeatured: idx % 3 === 0,
      status: 'Approved',
      views: 120 + idx * 15,
      createdAt: `2026-06-03T11:${idx + 10}:00Z`,
      userId: `user_gen_comm_${idx}`
    });
  });

  // Seed Three Wheelers (threewheeler)
  const threeWheelerAdditionsData = [
    { brand: 'Bajaj', model: 'RE Green CNG Auto', price: 390000, condition: 'Used', year: 2021, engine: '200 cc', fuel: 'CNG', image: 'https://images.unsplash.com/photo-1566008889998-ab8a4325028c?auto=format&fit=crop&q=80&w=350&h=250', desc: 'Original Bajaj Green CNG passenger auto-rickshaw. Features customized comfortable seats, fully digital speed counts console, and protective steel grilles.' },
    { brand: 'Mishuk', model: 'Electric battery tomtom', price: 135000, condition: 'New', year: 2024, engine: '1200W', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1626014303757-6cc6a3fb57ab?auto=format&fit=crop&q=80&w=350&h=250', desc: 'Zero emissions high-speed Mishuk model fully configured with lightweight lithium-ion fast charge batteries. Built-in high power headlights.' },
    { brand: 'Piaggio', model: 'Ape DX Passenger Auto', price: 295000, condition: 'Used', year: 2022, engine: '230 cc', fuel: 'LPG', image: 'https://images.unsplash.com/photo-1566008889998-ab8a4325028c?auto=format&fit=crop&q=80&w=350&h=250', desc: 'Premium Italian Ape DX passenger carrier. Soundproof body structure, highly relaxing passenger buffer spaces, extremely lightweight handlebar turn.' },
    { brand: 'Runner', model: 'RT Comfort CNG rickshaw', price: 340000, condition: 'Used', year: 2020, engine: '175 cc', fuel: 'CNG', image: 'https://images.unsplash.com/photo-1626014303757-6cc6a3fb57ab?auto=format&fit=crop&q=80&w=350&h=250', desc: 'Runner locally assembled comfort CNG passenger engine model. Smooth gearbox control flow, outstanding city mileage thresholds, secure steel canopy.' }
  ];

  threeWheelerAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_3w_${idx + 1}`,
      title: add.brand + ' ' + add.model + ' ' + add.year,
      type: 'threewheeler',
      brand: add.brand,
      model: add.model,
      year: add.year,
      condition: add.condition as any,
      price: add.price,
      priceFormatted: add.price.toLocaleString() + ' BDT',
      engineCapacity: add.engine,
      mileage: 18000 + idx * 3000,
      fuelType: add.fuel as any,
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: 'Badda CNG Corner Dealers',
      sellerPhone: '01815332211',
      sellerType: idx % 2 === 0 ? 'showroom' : 'private',
      isFeatured: idx % 2 === 0,
      status: 'Approved',
      views: 95 + idx * 11,
      createdAt: `2026-06-03T11:${idx + 18}:00Z`,
      userId: `user_gen_3w_${idx}`
    });
  });

  // Seed Bicycles (bicycle)
  const bicycleAdditionsData = [
    { brand: 'Veloce', model: 'Outrage 605 Hardtail', price: 18500, condition: 'Used', year: 2024, engine: 'N/A', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=350&h=250', desc: 'Lightweight Veloce aluminum mountain bike featuring professional Shimano gear shift speeds and premium front suspension fork shocks.' },
    { brand: 'Core Project', model: 'Carbon-Lite Hybrid Cycle', price: 16000, condition: 'Used', year: 2023, engine: 'N/A', fuel: 'Octane', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=350&h=250', desc: 'Highly aerodynamical alloy chassis frame designed for fast daily commuting in Dhaka. Extra grip thin tires, quick-release seat post.' },
    { brand: 'Duranta', model: 'Steel Commuter Bike', price: 8200, condition: 'New', year: 2024, engine: 'N/A', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=350&h=250', desc: 'Duranta locally manufactured commuter cycle. Very durable steel frame with chain protective ring casing and front cargo luggage basket.' }
  ];

  bicycleAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_bicycle_${idx + 1}`,
      title: add.brand + ' ' + add.model + ' ' + add.year,
      type: 'bicycle',
      brand: add.brand,
      model: add.model,
      year: add.year,
      condition: add.condition as any,
      price: add.price,
      priceFormatted: add.price.toLocaleString() + ' BDT',
      engineCapacity: add.engine,
      mileage: 150 + idx * 80,
      fuelType: 'Octane', // Arbitrary for fallback compatibility
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: 'Bicycle World BD',
      sellerPhone: '01912554433',
      sellerType: idx % 2 === 0 ? 'showroom' : 'private',
      isFeatured: idx % 2 === 1,
      status: 'Approved',
      views: 45 + idx * 7,
      createdAt: `2026-06-03T11:${idx + 22}:00Z`,
      userId: `user_gen_cycle_${idx}`
    });
  });

  // Seed EVs (ev)
  const evAdditionsData = [
    { brand: 'BYD', model: 'Atto 3 Electric SUV', price: 4150000, condition: 'New', year: 2024, engine: '150 kW (201 hp)', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=650', desc: 'The most popular electric SUV in Bangladesh. Standard range battery pack, 150 kW motor, range of 420km on a full charge. Fitted with rotating 12.8-inch touch screen, advanced ADAS cruise control features.' },
    { brand: 'Tesla', model: 'Model 3 Dual Motor AWD', price: 6900000, condition: 'Reconditioned', year: 2023, engine: '340 kW (456 hp)', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=650', desc: 'Directly imported from USA/Japan. Standard Autopilot, sleek white leather seats, premium surround sound system. Acceleration 0-100 km/h in 4.4 seconds. Registered and tax papers updated.' },
    { brand: 'Neta', model: 'V Electric Crossover', price: 2450000, condition: 'New', year: 2024, engine: '70 kW (95 hp)', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=650', desc: 'Highly budget-friendly entry-level crossover EV. Smart keyless start, 14.6-inch tablet screen console, range of up to 380km. Absolutely ideal for daily city driving in Dhaka traffic.' },
    { brand: 'Wuling', model: 'Binggo EV Hatchback', price: 1950000, condition: 'New', year: 2024, engine: '50 kW (68 hp)', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1563725023035-2131653925a4?auto=format&fit=crop&q=80&w=650', desc: 'A stylish and fashionable compact electric car with double dual-tone colors. 333km range, safe Lithium Iron Phosphate battery, retro classical seat aesthetics.' },
    { brand: 'Hyundai', model: 'Ioniq 5 AWD Premium', price: 8200000, condition: 'Reconditioned', year: 2023, engine: '239 kW (320 hp)', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=650', desc: 'Futuristic design award winner. Fast 800V charging system (10% to 80% in 18 minutes using rapid charger), ultra-comfortable memory lounge seats, digital side mirrors.' }
  ];

  evAdditionsData.forEach((add, idx) => {
    const div = divisions[idx % divisions.length];
    const loc = locationsMap[div][idx % locationsMap[div].length];
    result.push({
      id: `generated_ev_${idx + 1}`,
      title: add.brand + ' ' + add.model + ' ' + add.year,
      type: 'ev',
      brand: add.brand,
      model: add.model,
      year: add.year,
      condition: add.condition as any,
      price: add.price,
      priceFormatted: formatBDT(add.price),
      engineCapacity: add.engine,
      mileage: 400 + idx * 1200,
      fuelType: 'Electric',
      location: loc,
      division: div,
      description: add.desc,
      images: [add.image],
      sellerName: 'Chaka Electric Motors Ltd',
      sellerPhone: '01712998877',
      sellerType: idx % 2 === 0 ? 'showroom' : 'private',
      isFeatured: idx % 2 === 0,
      status: 'Approved',
      views: 240 + idx * 45,
      createdAt: `2026-06-03T11:${idx + 35}:00Z`,
      userId: `user_gen_ev_${idx}`
    });
  });

  // Post-process logic: Ensure EVERY category has at least 35+ listings
  const categoriesToVerify = ['car', 'bike', 'commercial', 'ev', 'threewheeler', 'bicycle', 'parts', 'service'];
  
  const extTemplates: Record<string, Array<{ brand: string; model: string; price: number; year: number; cond: string; eng: string; fuel: string; desc: string; }>> = {
    car: [
      { brand: 'Toyota', model: 'Premio F 1.5', price: 2450000, year: 2020, cond: 'Reconditioned', eng: '1500 cc', fuel: 'Octane', desc: 'Pearl white exterior with premium beige interior. Auction grade 4.5. Low daily mileage.' },
      { brand: 'Honda', model: 'Vezel RS Hybrid', price: 2750000, year: 2019, cond: 'Used', eng: '1500 cc', fuel: 'Hybrid', desc: 'Fresh RS styling. Solenoid brake sensors, dual shift paddles, exceptionally responsive.' },
      { brand: 'Toyota', model: 'Prius S LED', price: 2100000, year: 2018, cond: 'Used', eng: '1800 cc', fuel: 'Hybrid', desc: 'Vibrant hybrid daily driver. Outstanding city mileage of 24 km/L. Registered papers ready.' },
      { brand: 'Nissan', model: 'Harrier Progressive', price: 5800000, year: 2019, cond: 'Used', eng: '2000 cc', fuel: 'Octane', desc: 'Premium luxury executive crossover. Soft leather massage seats, lane assists.' }
    ],
    bike: [
      { brand: 'Yamaha', model: 'MT-15 V2', price: 410000, year: 2023, cond: 'Used', eng: '155 cc', fuel: 'Octane', desc: 'Naked streetfighter with USD forks, Bluetooth screen console.' },
      { brand: 'TVS', model: 'Apache RTR 160 4V', price: 205000, year: 2023, cond: 'Used', eng: '160 cc', fuel: 'Octane', desc: 'Riding modes edition (Rain, Urban, Sport) in absolute pristine condition.' },
      { brand: 'Bajaj', model: 'Pulsar NS160', price: 195000, year: 2022, cond: 'Used', eng: '160 cc', fuel: 'Petrol', desc: 'Muscular tank profiles, dual disc breaks, excellent road corner stability.' }
    ],
    commercial: [
      { brand: 'TATA', model: 'LPT 407 Cargo', price: 1650000, year: 2021, cond: 'Used', eng: '2900 cc', fuel: 'Diesel', desc: 'Heavy load carrier with reinforced steel loading bed. Highly reliable.' },
      { brand: 'Isuzu', model: 'NKR Blue Power', price: 2450000, year: 2019, cond: 'Used', eng: '2800 cc', fuel: 'Diesel', desc: 'Durable logistic box truck. Extremely fuel efficient BluePower engine.' },
      { brand: 'Mahindra', model: 'Bolero Maxi', price: 890000, year: 2022, cond: 'Used', eng: '2500 cc', fuel: 'Diesel', desc: 'Easy leaf spring suspension, great load utility on rural muddy roads.' }
    ],
    threewheeler: [
      { brand: 'Bajaj', model: 'RE Green CNG Auto', price: 380000, year: 2021, cond: 'Used', eng: '198 cc', fuel: 'CNG', desc: 'Fully serviced green CNG passenger transport. Solid chassis, new tires.' },
      { brand: 'Mishuk', model: 'E-Bike Battery Tomtom', price: 130000, year: 1200, cond: 'New', eng: '1200W', fuel: 'Electric', desc: 'Zero emissions eco friendly lithium-ion fast charge neighborhood transport.' }
    ],
    ev: [
      { brand: 'BYD', model: 'Seal EV Sedan', price: 6150000, year: 2024, cond: 'New', eng: '300 kW', fuel: 'Electric', desc: 'Stellar executive sedan. 520 km safe lithium iron range on full chargers.' },
      { brand: 'Tesla', model: 'Model Y Long Range', price: 7450000, year: 2023, cond: 'Reconditioned', eng: '280 kW', fuel: 'Electric', desc: 'American import. Autopilot features, minimalist clean white leather console.' }
    ],
    bicycle: [
      { brand: 'Veloce', model: 'Outrage 605 Hardtail', price: 18500, year: 2024, cond: 'New', eng: 'N/A', fuel: 'N/A', desc: ' Shimano dynamic shifts gearboxes, lightweight alloy components.' },
      { brand: 'Core Project', model: 'Carbon Lite Hybrid', price: 21000, year: 2023, cond: 'Used', eng: 'N/A', fuel: 'N/A', desc: 'Aerodynamic commuter hybrid frame leaning. Extremely fast on Dhaka streets.' }
    ],
    parts: [
      { brand: 'Michelin', model: 'Primacy 4 Tyre R16', price: 14500, year: 2024, cond: 'New', eng: 'N/A', fuel: 'N/A', desc: 'Grand touring car tyre with superior safety wet braking, silent highway ride.' },
      { brand: 'Bosch', model: 'Double Platinum Spark Plug', price: 3200, year: 2024, cond: 'New', eng: 'N/A', fuel: 'N/A', desc: 'High conducting core tip provides instantaneous engine throttle reactions.' }
    ],
    service: [
      { brand: 'AutoSpa', model: 'Ceramic Nano Coating', price: 25000, year: 2024, cond: 'New', eng: 'N/A', fuel: 'N/A', desc: 'Three layers premium sealant protects factory shine and repels mud grit.' },
      { brand: 'Hybrid Care', model: 'Diagnostic Cell Balancing', price: 15000, year: 2024, cond: 'New', eng: 'N/A', fuel: 'N/A', desc: 'Deep analytics software printout, chemical contacts cleansing, voltage test.' }
    ]
  };

  categoriesToVerify.forEach((categoryType) => {
    const existingListings = result.filter(l => l.type === categoryType);
    let count = existingListings.length;
    if (count < 35) {
      const difference = 35 - count;
      for (let i = 0; i < difference; i++) {
        const templates = extTemplates[categoryType] || [];
        const template = templates[i % templates.length];
        
        let generatedItem: any;
        if (template) {
          const randomPriceOffset = (i + 1) * Math.round(template.price * 0.03);
          const finalPrice = Math.round(template.price + (i % 2 === 0 ? randomPriceOffset : -randomPriceOffset));
          const div = divisions[i % divisions.length];
          const loc = locationsMap[div][i % locationsMap[div].length];
          
          generatedItem = {
            id: `dynamically_generated_${categoryType}_${i + 1}`,
            title: `${template.brand} ${template.model} ${template.year} - Special v${i + 1}`,
            type: categoryType,
            brand: template.brand,
            model: template.model,
            year: template.year,
            condition: template.cond,
            price: finalPrice > 0 ? finalPrice : template.price,
            engineCapacity: template.eng,
            fuelType: template.fuel,
            transmission: categoryType === 'bike' || categoryType === 'bicycle' ? 'Manual' : 'Automatic',
            mileage: 3000 + i * 2100,
            location: loc,
            division: div,
            description: template.desc,
            images: [],
            sellerName: i % 2 === 0 ? 'Siam Chowdhury' : 'Haq Bay Motors',
            sellerPhone: '01712987654',
            sellerType: i % 2 === 0 ? 'private' : 'showroom',
            showroomName: i % 2 === 1 ? 'Haq Bay Motors' : undefined,
            isShowroomVerified: i % 2 === 1,
            isFeatured: i % 5 === 0,
            status: 'Approved',
            views: 45 + (i * 15),
            createdAt: `2026-06-03T10:${20 + (i % 38)}:00Z`,
            userId: `user_dyn_${categoryType}_${i}`
          };
        } else {
          const base = existingListings[i % existingListings.length] || {
            title: 'Special Item Spec',
            brand: 'Generic',
            model: 'Comfort Edition',
            year: 2023,
            condition: 'Used',
            price: 150000,
            engineCapacity: '150 cc',
            description: 'High-quality robust model built for maximum fuel efficiency and long durability.',
            images: [],
          };

          const randomPriceOffset = (i + 1) * Math.round(base.price * 0.04);
          const finalPrice = Math.round(base.price + (i % 2 === 0 ? randomPriceOffset : -randomPriceOffset));
          const div = divisions[i % divisions.length];
          const loc = locationsMap[div][i % locationsMap[div].length];

          generatedItem = {
            ...base,
            id: `dynamically_generated_${categoryType}_${i + 1}`,
            type: categoryType,
            title: `${base.brand} ${base.model} - Pro Spec v${i + 1}`,
            price: finalPrice > 0 ? finalPrice : base.price,
            year: 2021 + (i % 4),
            condition: i % 3 === 0 ? 'New' : i % 3 === 1 ? 'Reconditioned' : 'Used',
            mileage: 4000 + i * 2500,
            location: loc,
            division: div,
            status: 'Approved',
            views: 65 + (i * 12),
            createdAt: `2026-06-03T09:${30 + (i % 28)}:00Z`,
            userId: `user_dyn_${categoryType}_${i}`
          };
        }
        result.push(generatedItem);
      }
    }
  });

  const imgPools: Record<string, string[]> = {
    car: ['1549399542-7e3f8b79c341', '1553440569-bcc63803a83d', '1533473359331-0135ef1b58bf', '1555215695-3004980ad54e', '1618843479313-40f8afb4b4d8', '1617814076367-b759c7d7e738', '1605559424843-9e4c228bf1c2', '1542282088-72c9c27ed0cd', '1511919884226-fd3cad34687c', '1502877338535-766e1452684a', '1492144534655-ae79c964c9d7', '1494976388531-d1058494cdd8', '1580273916550-e323be2ae537', '1563720223185-11003d516935', '1617788138017-80ad40651399', '1532581291347-9c39cf10a73c', '1567818735868-e71b99932e29', '1506015391300-4802dc74de2e', '1514316454349-750a7fd3da3a', '1537151000076-7c0a0c4f8ef0', '1541899481282-d53bffe3c35d', '1544829099-b9a0c07fad1a', '1551524559-8af4e6624178', '1583121274602-3e2820c69888', '1603584173870-7f23fdae1b7a', '1541348263662-e0c8de426174', '1562141961-b5d064ac6ed8', '1590362891991-f776e747a588', '1606016159991-dfe4f2746ad5', '1619642751034-765dfdf7c58e', '1503376780353-7e6692767b70', '1525609004556-c46c7d6cf0a3', '1568605117036-5fe5e7bab0b7', '1518256952390-d5be2a0bd85a', '1519641471654-76ce0107ad1b', '1510903117014-fc0219ee54a9', '1520137803300-9efd5db283bf', '1502169641789-f48ca411665a', '1494905998402-395d579af36f', '1542362567-b024c0f7e94b', '1562575214-da9fcf59b907'],
    bike: ['1568772585407-9361f9bf3a87', '1558981806-ec527fa84c39', '1444718019133-207926c8f29b', '1599819811279-d5ad9cccf838', '1609630875171-b1321377ee65', '1565814329452-e1efa11c5b89', '1508962914676-134849a727f0', '1525160351221-5b7c02b3506c', '1539799105421-41716ca9d0a6', '1469037490772-8b34c017f867', '1615887023516-9b369ae5ddcc', '1515777315840-2726ee1f5dc3', '1608151351111-e6e761614f27', '1527824401180-dd076b61df7e', '1509190134760-24be8d90f57b', '1625902120005-7f91c95ee13e', '1513386629272-9749f7e8b609', '1532454536767-f58c70a1a0b3', '1585829606993-e1f93d3aae8a', '1561578491-1ef612984524', '1558981453-2787f35a49ac', '1591637333184-19aa84b3e01f', '1579758629938-03607ccdbaba', '1594911774802-8822a707cff3', '1549488344-cbb6c34cf087', '1616422285628-3fdfcf982e5d', '1506015391300-4802dc74de2e', '1514316454349-750a7fd3da3a', '1563720223185-11003d516935', '1583121274602-3e2820c69888', '1520137803300-9efd5db283bf', '1502169641789-f48ca411665a', '1519641471654-76ce0107ad1b', '1558981403-c5f9899a28bc', '1508962914676-134849a727f0', '1558981453-2787f35a49ac', '1568772585407-9361f9bf3a87', '1558239000-7fae940cd379', '1518384423402-ddc9cdac7809', '1592478411213-6153e4ebdf07', '1609355799276-80f4f9f4cd85'],
    commercial: ['1601584115197-04ecc0da31d7', '1586528116311-ad8dd3c8310d', '1592838064975-475a80a232f0', '1626014303757-6cc6a3fb57ab', '1519003722824-c94d37a521a4', '1501700493740-fa92f6b1500d', '1590856029826-c985ecf06d3d', '1520127814988-66a9a62ef3ff', '1516597793540-c11dfb689ef2', '1612450508603-9d9fc922f51f', '1553181829-9e859be6d4e5', '1503942142241-1772590c5fe6', '1591123120675-6f7f1aae0e5b', '1565538810-7f2a1b94ea9a', '1542382156909-9ae37b3f56fd', '1582268611958-ebfd161ef9cf', '1601584115197-04ecc0da31d7', '1590856029826-c985ecf06d3d', '1503551723145-6c040742065b', '1595246140625-573b715d11dc', '1542382156909-9ae37b3f56fd', '1519003722824-c94d37a521a4', '1501700493740-fa92f6b1500d', '1586528116311-ad8dd3c8310d', '1516597793540-c11dfb689ef2', '1612450508603-9d9fc922f51f', '1553181829-9e859be6d4e5', '1503942142241-1772590c5fe6', '1591123120675-6f7f1aae0e5b', '1565538810-7f2a1b94ea9a', '1542382156909-9ae37b3f56fd', '1582268611958-ebfd161ef9cf', '1601584115197-04ecc0da31d7', '1519003722824-c94d37a521a4', '1501700493740-fa92f6b1500d', '1586528116311-ad8dd3c8310d'],
    threewheeler: ['1616422285628-3fdfcf982e5d', '1566008889998-ab8a4325028c', '1626014303757-6cc6a3fb57ab', '1558239000-7fae940cd379', '1518384423402-ddc9cdac7809', '1592478411213-6153e4ebdf07', '1609355799276-80f4f9f4cd85', '1566008889998-ab8a4325028c', '1616422285628-3fdfcf982e5d', '1558239000-7fae940cd379', '1626014303757-6cc6a3fb57ab', '1592478411213-6153e4ebdf07', '1566008889998-ab8a4325028c', '1518384423402-ddc9cdac7809', '1609355799276-80f4f9f4cd85', '1616422285628-3fdfcf982e5d', '1566008889998-ab8a4325028c', '1626014303757-6cc6a3fb57ab', '1558239000-7fae940cd379', '1518384423402-ddc9cdac7809', '1592478411213-6153e4ebdf07', '1609355799276-80f4f9f4cd85', '1566008889998-ab8a4325028c', '1616422285628-3fdfcf982e5d', '1558239000-7fae940cd379', '1626014303757-6cc6a3fb57ab', '1592478411213-6153e4ebdf07', '1566008889998-ab8a4325028c', '1518384423402-ddc9cdac7809', '1609355799276-80f4f9f4cd85', '1616422285628-3fdfcf982e5d', '1566008889998-ab8a4325028c', '1626014303757-6cc6a3fb57ab', '1558239000-7fae940cd379', '1518384423402-ddc9cdac7809', '1592478411213-6153e4ebdf07', '1609355799276-80f4f9f4cd85'],
    ev: ['1563720223185-11003d516935', '1619767886558-efdc259cde1a', '1568605117036-5fe5e7bab0b7', '1606016159991-dfe4f2746ad5', '1541899481282-d53bffe3c35d', '1551524559-8af4e6624178', '1614162692292-7ac56d7f2f1e', '1525609004556-c46c7d6cf0a3', '1563725023035-2131653925a4', '1605559424843-9e4c228bf1c2', '1574169208293-eaf06517af6a', '1621905252504-70cf900dfc22', '1533473359331-0135ef1b58bf', '1606561959339-b4ad0e3cf14a', '1551524559-8af4e6624178', '1563720223185-11003d516935', '1619767886558-efdc259cde1a', '1568605117036-5fe5e7bab0b7', '1541899481282-d53bffe3c35d', '1606016159991-dfe4f2746ad5', '1619642751034-765dfdf7c58e', '1503376780353-7e6692767b70', '1525609004556-c46c7d6cf0a3', '1568605117036-5fe5e7bab0b7', '1532581291347-9c39cf10a73c', '1511919884226-fd3cad34687c', '1506015391300-4802dc74de2e', '1494905998402-395d579af36f', '1502169641789-f48ca411665a', '1518256952390-d5be2a0bd85a', '1519641471654-76ce0107ad1b', '1510903117014-fc0219ee54a9', '1520137803300-9efd5db283bf', '1502169641789-f48ca411665a', '1494905998402-395d579af36f', '1542362567-b024c0f7e94b', '1562575214-da9fcf59b907'],
    bicycle: ['1485965120184-e220f721d03e', '1502744691368-6241b7fcf40e', '1532298229144-0ec0c57515c7', '1571068316341-38cb427af2f9', '1507038732509-8b1a9623223a', '1529422643029-d4585747aaf2', '1544192240-bc500b11122a', '1517649763962-0c623066013b', '1530143311094-34d807799e8f', '1518619732941-89ec90a821d2', '1485965120184-e220f721d03e', '1502744691368-6241b7fcf40e', '1532298229144-0ec0c57515c7', '1571068316341-38cb427af2f9', '1507038732509-8b1a9623223a', '1529422643029-d4585747aaf2', '1544192240-bc500b11122a', '1517649763962-0c623066013b', '1530143311094-34d807799e8f', '1518619732941-89ec90a821d2', '1485965120184-e220f721d03e', '1502744691368-6241b7fcf40e', '1532298229144-0ec0c57515c7', '1571068316341-38cb427af2f9', '1507038732509-8b1a9623223a', '1529422643029-d4585747aaf2', '1544192240-bc500b11122a', '1517649763962-0c623066013b', '1530143311094-34d807799e8f', '1518619732941-89ec90a821d2', '1485965120184-e220f721d03e', '1502744691368-6241b7fcf40e', '1532298229144-0ec0c57515c7'],
    parts: ['1486006920555-c77dce18193b', '1580273916550-e323be2ae537', '1507136566006-cfc505b114fc', '1617469767053-d3b508a0d783', '1609101033281-b6574c82c3c1', '1551524559-8af4e6624178', '1613045437895-c89bdf01cc03', '1619642751034-765dfdf7c58e', '1565538810-7f2a1b94ea9a', '1605559424843-9e4c228bf1c2', '1581094831206-880c5f2b2e8c', '1621245084903-8dc9fc192c01', '1507136566006-cfc505b114fc', '1613045437895-c89bdf01cc03', '1619642751034-765dfdf7c58e', '1565538810-7f2a1b94ea9a', '1605559424843-9e4c228bf1c2', '1581094831206-880c5f2b2e8c', '1621245084903-8dc9fc192c01', '1486006920555-c77dce18193b', '1580273916550-e323be2ae537', '1507136566006-cfc505b114fc', '1617469767053-d3b508a0d783', '1609101033281-b6574c82c3c1', '1551524559-8af4e6624178', '1613045437895-c89bdf01cc03', '1619642751034-765dfdf7c58e', '1565538810-7f2a1b94ea9a', '1605559424843-9e4c228bf1c2', '1581094831206-880c5f2b2e8c', '1621245084903-8dc9fc192c01', '1486006920555-c77dce18193b', '1580273916550-e323be2ae537', '1507136566006-cfc505b114fc', '1617469767053-d3b508a0d783', '1609101033281-b6574c82c3c1', '1551524559-8af4e6624178', '1613045437895-c89bdf01cc03', '1619642751034-765dfdf7c58e', '1565538810-7f2a1b94ea9a', '1605559424843-9e4c228bf1c2', '1581094831206-880c5f2b2e8c', '1621245084903-8dc9fc192c01'],
    service: ['1486006920555-c77dce18193b', '1619642751034-765dfdf7c58e', '1507136566006-cfc505b114fc', '1530047139884-2a623066013b', '1516515429215-685b376d2994', '1607604276587-f8232f623f46', '1599819811279-d5ad9cccf838', '1581094831206-880c5f2b2e8c', '1613045437895-c89bdf01cc03', '1621245084903-8dc9fc192c01', '1537151000076-7c0a0c4f8ef0', '1605559424843-9e4c228bf1c2', '1516515429215-685b376d2994', '1607604276587-f8232f623f46', '1599819811279-d5ad9cccf838', '1581094831206-880c5f2b2e8c', '1613045437895-c89bdf01cc03', '1621245084903-8dc9fc192c01', '1537151000076-7c0a0c4f8ef0', '1605559424843-9e4c228bf1c2', '1516515429215-685b376d2994', '1607604276587-f8232f623f46', '1599819811279-d5ad9cccf838', '1581094831206-880c5f2b2e8c', '1613045437895-c89bdf01cc03', '1621245084903-8dc9fc192c01', '1537151000076-7c0a0c4f8ef0', '1605559424843-9e4c228bf1c2', '1516515429215-685b376d2994', '1607604276587-f8232f623f46', '1599819811279-d5ad9cccf838', '1581094831206-880c5f2b2e8c', '1613045437895-c89bdf01cc03', '1621245084903-8dc9fc192c01', '1537151000076-7c0a0c4f8ef0']
  };

  const categoryCounters: Record<string, number> = {};

  return result.map((listing, idx) => {
    let accidentHistory = undefined;
    if (idx === 3 || idx === 7 || idx === 11) {
      accidentHistory = {
        hasAccidents: true,
        details: "বাম্পার ও দরজা স্ক্র্যাচের কারণে একবার সামান্য (Minor) ডেন্ট এবং পেইন্ট করা হয়েছিল। কোনো ধরনের ইঞ্জিন বা চ্যাসিস ড্যামেজ নেই। অনুমোদিত ডিলার পয়েন্ট থেকে সার্ভিসিং করা হয়েছে।",
        reportDate: "2024-11-15"
      };
    } else if (idx === 5 || idx === 12) {
      accidentHistory = {
        hasAccidents: true,
        details: "Minor rear bumper scratch repair. Original bumper restored perfectly at the brand showroom. Certified inspection report available.",
        reportDate: "2025-03-22"
      };
    } else {
      accidentHistory = {
        hasAccidents: false,
        details: "এই গাড়ি বা বাইকে কোনো ধরনের দুর্ঘটনার রেকর্ড নেই। সম্পূর্ণ বডি স্ট্রাকচার, চ্যাসিস এবং ইঞ্জিন অরিজিনাল অবস্থায় রয়েছে।",
        reportDate: "2026-05-18"
      };
    }

    const type = listing.type || 'car';
    if (!categoryCounters[type]) {
      categoryCounters[type] = 0;
    }
    const currentCount = categoryCounters[type]++;
    const pool = imgPools[type] || imgPools.car;
    const imgId = pool[currentCount % pool.length];
    const uniqueUrl = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=650`;

    return {
      ...listing,
      images: [uniqueUrl],
      priceFormatted: formatBDT(listing.price),
      verified: listing.isFeatured || listing.isShowroomVerified || (idx % 3 === 0),
      accidentHistory
    };
  });
}

// All simulated listing list combined
export const ALL_INITIAL_LISTINGS = expandListingsToTwenty();

// Realistic sponsor advertisements slots preconfigured
export const INITIAL_AD_SLOTS: AdvertisementSlot[] = [
  {
    id: 'ad_home_1',
    placement: 'home-top',
    title: 'bKash Auto Premium Insurance',
    description: 'Get up to 20% Discount on Car Insurance through bKash payment this June!',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-6fd96a1a44e1?auto=format&fit=crop&q=80&w=1000',
    targetUrl: 'tel:01319075810',
    adType: 'banner',
    isActive: true,
    impressions: 1242,
    clicks: 148
  },
  {
    id: 'ad_home_2',
    placement: 'home-top',
    title: 'Nagad Fast Track Auto Loans',
    description: 'Zero down payment & up to 100% security coverage for reconditioned cars this season!',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000',
    targetUrl: 'https://www.nagad.com.bd',
    adType: 'banner',
    isActive: true,
    impressions: 532,
    clicks: 42
  },
  {
    id: 'ad_home_3',
    placement: 'home-top',
    title: 'Cardo BD Premium Car Wash',
    description: 'Eco-friendly detailed steam wash with premium wax coating starting at 1200 BDT only!',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1000',
    targetUrl: 'https://www.facebook.com',
    adType: 'banner',
    isActive: true,
    impressions: 395,
    clicks: 29
  },
  {
    id: 'ad_sidebar_1',
    placement: 'listing-detail-sidebar',
    title: 'Shell Helix Ultra Lubricant',
    description: 'Protect your vehicle engine under excessive heat with Shell Helix Ultra formulation.',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=350&h=250',
    targetUrl: 'https://www.shell.com',
    adType: 'native',
    isActive: true,
    impressions: 642,
    clicks: 45
  },
  {
    id: 'ad_sidebar_2',
    placement: 'listing-detail-sidebar',
    title: 'Mobil 1 Full Synthetic Fluid',
    description: 'Engineered for ultimate engine performance and protection over 15,000 miles.',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=350&h=250',
    targetUrl: 'https://www.mobil.com',
    adType: 'native',
    isActive: true,
    impressions: 341,
    clicks: 18
  },
  {
    id: 'ad_sidebar_3',
    placement: 'listing-detail-sidebar',
    title: 'Castrol Edge Titanium FST',
    description: 'Unlocks maximum engine output with liquid titanium strength under high stress.',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=350&h=250',
    targetUrl: 'https://www.castrol.com',
    adType: 'native',
    isActive: true,
    impressions: 489,
    clicks: 31
  },
  {
    id: 'ad_bottom_1',
    placement: 'listing-detail-bottom',
    title: 'Runner Lubricants & Spark Plugs',
    description: 'Bangladesh genuine replacement bike spares and plugs at discounted rates.',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=1000',
    targetUrl: 'https://www.runnerbd.com',
    adType: 'banner',
    isActive: true,
    impressions: 894,
    clicks: 58
  },
  {
    id: 'ad_bottom_2',
    placement: 'listing-detail-bottom',
    title: 'Walton Maintenance-Free Batteries',
    description: 'Run your car or bike with high energy confidence. Long lasting warranty support.',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000',
    targetUrl: 'https://www.waltonbd.com',
    adType: 'banner',
    isActive: true,
    impressions: 412,
    clicks: 22
  },
  {
    id: 'ad_bottom_3',
    placement: 'listing-detail-bottom',
    title: 'Toyota Genuine Parts Bangladesh',
    description: 'Extend your engine life. Verified Japanese imported filtration elements and brake pads.',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000',
    targetUrl: 'https://www.toyota.com.bd',
    adType: 'banner',
    isActive: true,
    impressions: 598,
    clicks: 47
  }
];

export const MOCK_AUTO_REPLIES: string[] = [
  "Hello! Yes, the vehicle is indeed available. Are you interested in dropping by to inspect it in person?",
  "Hello! Yes, the vehicle is available. You can inspect it at our location. When do you wish to join us for a test drive?",
  "Thank you for your message. The price can be slightly adjusted when we meet in person. Please share your phone number, and I will call you.",
  "The paperwork is fully original and updated up to 2027. We invite you to sit for virtual negotiations or physically test the specs.",
  "Hello, thanks for expressing interest! We have other options available in the showroom too. Contact us at our number directly."
];
