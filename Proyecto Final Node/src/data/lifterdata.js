const powerlifters = [
    {
      placement: 1,
      name: 'Lores Fernández Ana',
      birthYear: 1996,
      category: 'SNR',
      weight: 46.83,
      squat: 140.0,
      benchPress: 62.5,
      deadlift: 145.0,
      total: 347.5,
      GLPoints: 96.68,
      championship: 'Europeo Powerlifting Raw',
      location: 'Skierniewice (POL)',
      date: '2022-12-04',
      gender: 'mujer',
      image: 'https://media.licdn.com/dms/image/D4D03AQEuiumg2_Hnzg/profile-displayphoto-shrink_800_800/0/1693495863276?e=2147483647&v=beta&t=dOqIk4PDieG4Tvr1sVOQcxOu7PGQsT7Xkh-C0Bzoxs0'
    },

    {
      placement: 1,
      name: 'Larrosa Cintas Nayma',
      birthYear: 2000,
      category: 'JUN',
      weight: 51.91,
      squat: 122.5,
      benchPress: 80.0,
      deadlift: 165.0,
      total: 367.5,
      GLPoints: 92.93,
      championship: 'Europeo Powerlifting Raw',
      location: 'Skierniewice (POL)',
      date: '2022-12-04',
      gender: 'mujer',
      image: 'https://res.cloudinary.com/daxddugwt/image/upload/v1701360235/Captura_de_pantalla_2023-11-30_a_las_17.03.48_hlr2hn.png'
    },
    {
      placement: 2,
      name: 'Cabañil Chávez Jessica',
      birthYear: 1997,
      category: 'SNR',
      weight: 51.46,
      squat: 142.5,
      benchPress: 70.0,
      deadlift: 147.5,
      total: 360.0,
      GLPoints: 91.73,
      championship: 'Europeo Powerlifting Raw',
      location: 'Skierniewice (POL)',
      date: '2022-12-04',
      gender: 'mujer',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxAyT2Yfpvr59QKL5k4lVB6tDRqZGVnbwAky3Fu_M1TKBF3svv7SlhVuIvq0jPeXeqRJ4&usqp=CAU'
    },

    {
      placement: 1,
      name: 'Da Silva Dias Maiara',
      birthYear: 1999,
      category: 'JUN',
      weight: 56.34,
      squat: 170.0,
      benchPress: 86.5,
      deadlift: 195.0,
      total: 451.5,
      GLPoints: 106.82,
      championship: 'XII Cpto España Absoluto Powerlifting Raw',
      location: 'Ibi, Alicante',
      date: '2022-04-03',
      gender: 'mujer',
      image: 'https://powerhispania.net/wp-content/uploads/2023/06/Maiara_Da_Silva_57kg_2.jpg'
    },
    {
      placement: 2,
      name: 'Rey Villamea Laura',
      birthYear: 1993,
      category: 'SNR',
      weight: 55.45,
      squat: 122.5,
      benchPress: 80.0,
      deadlift: 180.0,
      total: 382.5,
      GLPoints: 91.63,
      championship: 'Europeo Powerlifting Raw',
      location: 'Skierniewice (POL)',
      date: '2022-12-04',
      gender: 'mujer',
      image: 'https://powerhispania.net/wp-content/uploads/2023/06/Laura_Rey_57kg.jpg'
    },

    {
      placement: 1,
      name: 'Soto Ruiz Inmaculada',
      birthYear: 2000,
      category: 'JUN',
      weight: 62.9,
      squat: 160.0,
      benchPress: 103.0,
      deadlift: 201.0,
      total: 464.0,
      GLPoints: 101.62,
      championship: 'XII Cpto España Absoluto Powerlifting Raw',
      location: 'Ibi, Alicante',
      date: '2022-04-03',
      gender: 'mujer',
      image: 'https://lh3.googleusercontent.com/-_3g2ADyAE8fR_Wn7v2C4u8B0a9JnZU3auKqGPFqFKhRE2ZAet6_Mv09tEFTZrQDpBm7uSaC5g3wDwwj1KRNpjOEIq5SXiz9oWBhv3qPkd4IN34=w1900-e365'
    },
    {
      placement: 2,
      name: 'Badaseraye Sheila',
      birthYear: 1987,
      category: 'SNR',
      weight: 60.75,
      squat: 167.5,
      benchPress: 90.0,
      deadlift: 170.0,
      total: 427.5,
      GLPoints: 95.8,
      championship: 'Copa España',
      location: 'Baza, Granada',
      date: '2022-11-06',
      gender: 'mujer',
      image: 'https://i0.wp.com/afrofeminas.com/wp-content/uploads/2022/09/Preparacion-back-squar.jpeg?resize=1536%2C1023&ssl=1'
    },

    {
      placement: 1,
      name: 'Blecua Malak Amira Isabel',
      birthYear: 1999,
      category: 'JUN',
      weight: 68.71,
      squat: 165.0,
      benchPress: 109.0,
      deadlift: 202.5,
      total: 476.5,
      GLPoints: 98.97,
      championship: 'XII Cpto España Absoluto Powerlifting Raw',
      location: 'Ibi, Alicante',
      date: '2022-04-03',
      gender: 'mujer',
      image: 'https://scontent.fvlc6-2.fna.fbcdn.net/v/t39.30808-6/358688769_650554153775607_4293120119679009135_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=zPYPbEKBPZEAX-9x7FS&_nc_ht=scontent.fvlc6-2.fna&oh=00_AfDEhzYM9hvkJtZEU-3cSz-IzKSUi1cgoEnibCyPdKrCig&oe=656DA4FD'
    },
    {
      placement: 2,
      name: 'Vico Martinez Eva',
      birthYear: 1998,
      category: 'SNR',
      weight: 68.13,
      squat: 165.0,
      benchPress: 109.5,
      deadlift: 195.0,
      total: 469.5,
      GLPoints: 97.98,
      championship: 'XII Cpto España Absoluto Powerlifting Raw',
      location: 'Ibi, Alicante',
      date: '2022-04-03',
      gender: 'mujer',
      image: 'https://scontent.fvlc6-2.fna.fbcdn.net/v/t1.6435-9/105484668_3299942720065417_6649320804200786600_n.png?_nc_cat=109&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=Jr9vc97IDNkAX-xmcZZ&_nc_oc=AQl1GrM28PQBCooByibWG05TBicYrtZ_2utul8VoCkfZip7gkB2YDiQQkT-0RiJkkbk&_nc_ht=scontent.fvlc6-2.fna&oh=00_AfAjmp1W8ECZMZXixY_fY9kAR3oekTJnBMYe8DEpc77p7Q&oe=6590180C'
    },

    {
      placement: 1,
      name: 'Sanchez-Manjavacas Ruiz Sara',
      birthYear: 1998,
      category: 'SNR',
      weight: 75.42,
      squat: 177.5,
      benchPress: 112.5,
      deadlift: 220.0,
      total: 510.0,
      GLPoints: 100.92,
      championship: 'Europeo Powerlifting Raw',
      location: 'Skierniewice (POL)',
      date: '2022-12-04',
      gender: 'mujer',
      image: 'https://www.elche.me/web/sites/default/files/styles/max_2600x2600/public/2023-07/sara%20sanchezmanjavacas.jpg?itok=Mynh_oZn'
    },
    {
      placement: 2,
      name: 'Erimo Sabadell Rosa',
      birthYear: 1992,
      category: 'SNR',
      weight: 73.39,
      squat: 170.0,
      benchPress: 95.0,
      deadlift: 207.5,
      total: 472.5,
      GLPoints: 94.74,
      championship: 'XII Cpto España Absoluto Powerlifting Raw',
      location: 'Ibi, Alicante',
      date: '2022-04-03',
      gender: 'mujer',
      image: 'https://powerhispania.net/wp-content/uploads/2023/06/Rosa_Erimo_76kg_3.jpg'
    },
    {
      placement: 3,
      name: 'Gomez Ahumada Estela',
      birthYear: 1993,
      category: 'SNR',
      weight: 74.27,
      squat: 167.5,
      benchPress: 90.0,
      deadlift: 175.0,
      total: 432.5,
      GLPoints: 86.22,
      championship: 'Western European Cup',
      location: 'Aulnat, Francia',
      date: '2022-09-11',
      gender: 'mujer',
      image: 'https://powerhispania.net/wp-content/uploads/2023/06/M_Estela_Cuervo_52kg.jpg'
    },
    {
      placement: 1,
      name: 'Fuentes Tubella Paula',
      birthYear: 1998,
      category: 'SNR',
      weight: 81.73,
      squat: 180.0,
      benchPress: 90.0,
      deadlift: 197.5,
      total: 467.5,
      GLPoints: 89.25,
      championship: 'Copa España',
      location: 'Baza, Granada',
      date: '2022-11-06',
      gender: 'mujer',
      image: 'https://res.cloudinary.com/daxddugwt/image/upload/v1701359279/Captura_de_pantalla_2023-11-30_a_las_16.47.54_dza17g.png'
    },
    {
      placement: 2,
      name: 'Vargas Fernandez Serena',
      birthYear: 2000,
      category: 'JUN',
      weight: 83.26,
      squat: 175.0,
      benchPress: 95.5,
      deadlift: 195.0,
      total: 465.5,
      GLPoints: 88.21,
      championship: 'XII Cpto España Absoluto Powerlifting Raw',
      location: 'Ibi, Alicante',
      date: '2022-04-03',
      gender: 'mujer',
      image: 'https://s3.ppllstatics.com/ideal/www/multimedia/202112/08/media/cortadas/svargas-2-kAqG-U160187952356enC-1248x770@Ideal.jpg'
    },
    {
      placement: 3,
      name: 'Cuevas Mulero Mila',
      birthYear: 1974,
      category: 'M1',
      weight: 83.7,
      squat: 170.0,
      benchPress: 82.5,
      deadlift: 213.0,
      total: 465.5,
      GLPoints: 88.03,
      championship: 'Europeo Másters Powerlifting Raw',
      location: 'Vilnius, Lituania',
      date: '2022-03-13',
      gender: 'mujer',
      image: 'https://www.psoeelpuerto.es/wp-content/uploads/2020/03/Foto-Mila-Cuevas-1.jpeg'
    },

    {
      placement: 1,
      name: "Campano Díaz Iván",
      birthYear: 2001,
      category: "JUN",
      weight: 58.5,
      squat: 197.5,
      benchPress: 120.0,
      deadlift: 247.5,
      total: 565.0,
      GLPoints: 93.92,
      championship: "Mundial JUN-SBJ Powerlifting",
      location: "Estambul, Turquía",
      date: "2022-09-04",
      gender: "hombre",
      image: 'https://powerhispania.net/wp-content/uploads/2023/06/Ivan_Campano_59kg.jpg'
    },
    {
      placement: 2,
      name: "Quirante Pérez David",
      birthYear: 2001,
      category: "JUN",
      weight: 58.9,
      squat: 172.5,
      benchPress: 102.5,
      deadlift: 215.0,
      total: 490.0,
      GLPoints: 81.16,
      championship: "Mundial JUN-SBJ Powerlifting",
      location: "Estambul, Turquía",
      date: "2022-09-04",
      gender: "hombre",
      image: 'https://www.webdebaza.com/wp-content/uploads/2019/12/Campeonato-Europa-de-powerlifting-1.jpg'
    },
    {
      placement: 3,
      name: "Raposo Anton Victor Andres",
      birthYear: 1993,
      category: "SNR",
      weight: 57.41,
      squat: 147.5,
      benchPress: 90.0,
      deadlift: 200.0,
      total: 437.5,
      GLPoints: 73.46,
      championship: "Copa España",
      location: "Baza, Granada",
      date: "2022-11-06",
      gender: "hombre",
      image: 'https://somoslalacanti.com/wp-content/uploads/2023/06/DSC09625-1024x683.jpg'
    },


    {
      placement: 1,
      name: "Herraiz Francés Alberto",
      birthYear: 2000,
      category: "JUN",
      weight: 72.3,
      squat: 255.0,
      benchPress: 165.0,
      deadlift: 277.5,
      total: 697.5,
      GLPoints: 103.65,
      championship: "Europeo Powerlifting Raw",
      location: "Skierniewice (POL)",
      date: "2022-12-04",
      gender: "hombre",
      image: 'https://pozueloin.es/media/revistas/articulos/fotos/2022/01/12/alberto-herraiz-de-pozuelo-y-campeon-del-mundo-de-powerlifting-03.jpg'
    },
    {
      placement: 2,
      name: "Albadalejo Castro Marcos",
      birthYear: 2001,
      category: "JUN",
      weight: 73.27,
      squat: 242.5,
      benchPress: 140.0,
      deadlift: 285.0,
      total: 667.5,
      GLPoints: 98.50,
      championship: "Europeo Powerlifting Raw",
      location: "Skierniewice (POL)",
      date: "2022-12-04",
      gender: "hombre",
      image: 'https://media.licdn.com/dms/image/C4E03AQGyBrQzW0kL8w/profile-displayphoto-shrink_800_800/0/1661947391474?e=2147483647&v=beta&t=X5CtsYyUyE_0kc1rWvpisB9QGEUqqequCjYzmlmztZA'
    },

    {
      placement: 2,
      name: "Cortes Heredia Jaime",
      birthYear: 1996,
      category: "SNR",
      weight: 82.71,
      squat: 237.5,
      benchPress: 175.0,
      deadlift: 315.0,
      total: 727.5,
      GLPoints: 100.90,
      championship: "XII Cpto España Absoluto Powerlifting Raw",
      location: "Ibi, Alicante",
      date: "2022-04-03",
      gender: "hombre",
      image: 'https://powerhispania.net/wp-content/uploads/2023/06/Jaime_Cortes_83kg_2.jpg'
    },

      {
        placement: 1,
        name: "Fuentes Medina Rubén",
        birthYear: 1995,
        category: "SNR",
        weight: 91.53,
        squat: 307.5,
        benchPress: 185.0,
        deadlift: 310.0,
        total: 802.5,
        GLPoints: 105.81,
        championship: "Europeo Powerlifting Raw",
        location: "Skierniewice (POL)",
        date: "2022-12-04",
        gender: "hombre",
        image: 'https://scontent.fvlc6-1.fna.fbcdn.net/v/t1.6435-9/71176303_2971517042923730_4793580301479575552_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=c2HVSC54tu4AX-RDwMe&_nc_ht=scontent.fvlc6-1.fna&oh=00_AfCV3-pf_CxnvllH_nOAplQwVdMrqVm8Lxgvm6x5IycEmw&oe=65903D39'
      },
      {
        placement: 2,
        name: "Rius i Pecamins Marc",
        birthYear: 1997,
        category: "SNR",
        weight: 92.05,
        squat: 275.0,
        benchPress: 172.5,
        deadlift: 345.0,
        total: 792.5,
        GLPoints: 104.20,
        championship: "Europeo Powerlifting Raw",
        location: "Skierniewice (POL)",
        date: "2022-12-04",
        gender: "hombre",
        image: 'https://yt3.googleusercontent.com/ytc/APkrFKbDLRgPO7HUuCqlv2GBJTrE0-aEALPPBPuHGF9Suw=s900-c-k-c0x00ffffff-no-rj'
      },

      {
        placement: 1,
        name: "Vázquez Hdez-Carrillo Víctor",
        birthYear: 1995,
        category: "SNR",
        weight: 119.07,
        squat: 317.5,
        benchPress: 210.0,
        deadlift: 337.5,
        total: 865.0,
        GLPoints: 100.90,
        championship: "Europeo Powerlifting Raw",
        location: "Skierniewice (POL)",
        date: "2022-12-04",
        gender: "hombre",
        image: 'https://powerhispania.net/wp-content/uploads/2023/06/Victor_Vazquez_120kg.jpg'
      },
      {
        placement: 1,
        name: "Rico Martín Rubén",
        birthYear: 1984,
        category: "SNR",
        weight: 199.60,
        squat: 380.0,
        benchPress: 230.0,
        deadlift: 335.0,
        total: 945.0,
        GLPoints: 91.16,
        gender: "hombre",
        image: 'https://powerhispania.net/wp-content/uploads/2023/06/Ruben_Rico_120kg_3.jpg'
      }
    ]

    // const powerlifters = [
    //   {
    //     placement: 1,
    //     name: 'Lores Fernández Ana',
    //     birthYear: 1996,
    //     category: 'SNR',
    //     weight: 46.83,
    //     squat: 140.0,
    //     benchPress: 62.5,
    //     deadlift: 145.0,
    //     total: 347.5,
    //     GLPoints: 96.68,
    //     championship: 'Europeo Powerlifting Raw',
    //     location: 'Skierniewice (POL)',
    //     date: '2022-12-04',
    //     gender: 'mujer',
    //     image: 'https://media.licdn.com/dms/image/D4D03AQEuiumg2_Hnzg/profile-displayphoto-shrink_800_800/0/1693495863276?e=2147483647&v=beta&t=dOqIk4PDieG4Tvr1sVOQcxOu7PGQsT7Xkh-C0Bzoxs0'
    //   },
    //   {
    //     placement: 2,
    //     name: 'Sanchez Gutierrez Miriam',
    //     birthYear: 1997,
    //     category: 'SNR',
    //     weight: 46.32,
    //     squat: 100.0,
    //     benchPress: 70.5,
    //     deadlift: 132.5,
    //     total: 303.0,
    //     GLPoints: 85.23,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //   },
    //   {
    //     placement: 1,
    //     name: 'Larrosa Cintas Nayma',
    //     birthYear: 2000,
    //     category: 'JUN',
    //     weight: 51.91,
    //     squat: 122.5,
    //     benchPress: 80.0,
    //     deadlift: 165.0,
    //     total: 367.5,
    //     GLPoints: 92.93,
    //     championship: 'Europeo Powerlifting Raw',
    //     location: 'Skierniewice (POL)',
    //     date: '2022-12-04',
    //     gender: 'mujer',
    //     image: 'https://res.cloudinary.com/daxddugwt/image/upload/v1701360235/Captura_de_pantalla_2023-11-30_a_las_17.03.48_hlr2hn.png'
    //   },
    //   {
    //     placement: 2,
    //     name: 'Cabañil Chávez Jessica',
    //     birthYear: 1997,
    //     category: 'SNR',
    //     weight: 51.46,
    //     squat: 142.5,
    //     benchPress: 70.0,
    //     deadlift: 147.5,
    //     total: 360.0,
    //     GLPoints: 91.73,
    //     championship: 'Europeo Powerlifting Raw',
    //     location: 'Skierniewice (POL)',
    //     date: '2022-12-04',
    //     gender: 'mujer',
    //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxAyT2Yfpvr59QKL5k4lVB6tDRqZGVnbwAky3Fu_M1TKBF3svv7SlhVuIvq0jPeXeqRJ4&usqp=CAU'
    //   },
    //   {
    //     placement: 3,
    //     name: 'Diaz Ruiz Violeta',
    //     birthYear: 1996,
    //     category: 'SNR',
    //     weight: 51.07,
    //     squat: 115.0,
    //     benchPress: 75.0,
    //     deadlift: 152.5,
    //     total: 342.5,
    //     GLPoints: 87.85,
    //     championship: 'Copa España',
    //     location: 'Baza, Granada',
    //     date: '2022-11-06',
    //     gender: 'mujer',
    //   },
    //   {
    //     placement: 1,
    //     name: 'Da Silva Dias Maiara',
    //     birthYear: 1999,
    //     category: 'JUN',
    //     weight: 56.34,
    //     squat: 170.0,
    //     benchPress: 86.5,
    //     deadlift: 195.0,
    //     total: 451.5,
    //     GLPoints: 106.82,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //     image: 'https://powerhispania.net/wp-content/uploads/2023/06/Maiara_Da_Silva_57kg_2.jpg'
    //   },
    //   {
    //     placement: 2,
    //     name: 'Rey Villamea Laura',
    //     birthYear: 1993,
    //     category: 'SNR',
    //     weight: 55.45,
    //     squat: 122.5,
    //     benchPress: 80.0,
    //     deadlift: 180.0,
    //     total: 382.5,
    //     GLPoints: 91.63,
    //     championship: 'Europeo Powerlifting Raw',
    //     location: 'Skierniewice (POL)',
    //     date: '2022-12-04',
    //     gender: 'mujer',
    //     image: 'https://powerhispania.net/wp-content/uploads/2023/06/Laura_Rey_57kg.jpg'
    //   },
    //   {
    //     placement: 3,
    //     name: 'Gutierrez Gutierrez Esther',
    //     birthYear: 1996,
    //     category: 'SNR',
    //     weight: 56.88,
    //     squat: 147.5,
    //     benchPress: 75.0,
    //     deadlift: 160.0,
    //     total: 382.5,
    //     GLPoints: 89.85,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //   },
    //   {
    //     placement: 1,
    //     name: 'Soto Ruiz Inmaculada',
    //     birthYear: 2000,
    //     category: 'JUN',
    //     weight: 62.9,
    //     squat: 160.0,
    //     benchPress: 103.0,
    //     deadlift: 201.0,
    //     total: 464.0,
    //     GLPoints: 101.62,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //     image: 'https://lh3.googleusercontent.com/-_3g2ADyAE8fR_Wn7v2C4u8B0a9JnZU3auKqGPFqFKhRE2ZAet6_Mv09tEFTZrQDpBm7uSaC5g3wDwwj1KRNpjOEIq5SXiz9oWBhv3qPkd4IN34=w1900-e365'
    //   },
    //   {
    //     placement: 2,
    //     name: 'Badaseraye Sheila',
    //     birthYear: 1987,
    //     category: 'SNR',
    //     weight: 60.75,
    //     squat: 167.5,
    //     benchPress: 90.0,
    //     deadlift: 170.0,
    //     total: 427.5,
    //     GLPoints: 95.8,
    //     championship: 'Copa España',
    //     location: 'Baza, Granada',
    //     date: '2022-11-06',
    //     gender: 'mujer',
    //     image: 'https://i0.wp.com/afrofeminas.com/wp-content/uploads/2022/09/Preparacion-back-squar.jpeg?resize=1536%2C1023&ssl=1'
    //   },
    //   {
    //     placement: 3,
    //     name: 'Etxepare Amundarain Naroa',
    //     birthYear: 1998,
    //     category: 'SNR',
    //     weight: 61.3,
    //     squat: 157.5,
    //     benchPress: 82.5,
    //     deadlift: 175.0,
    //     total: 415.0,
    //     GLPoints: 92.46,
    //     championship: 'Copa España',
    //     location: 'Baza, Granada',
    //     date: '2022-11-06',
    //     gender: 'mujer',
    //   },
    //   {
    //     placement: 1,
    //     name: 'Blecua Malak Amira Isabel',
    //     birthYear: 1999,
    //     category: 'JUN',
    //     weight: 68.71,
    //     squat: 165.0,
    //     benchPress: 109.0,
    //     deadlift: 202.5,
    //     total: 476.5,
    //     GLPoints: 98.97,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //     image: 'https://scontent.fvlc6-2.fna.fbcdn.net/v/t39.30808-6/358688769_650554153775607_4293120119679009135_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=zPYPbEKBPZEAX-9x7FS&_nc_ht=scontent.fvlc6-2.fna&oh=00_AfDEhzYM9hvkJtZEU-3cSz-IzKSUi1cgoEnibCyPdKrCig&oe=656DA4FD'
    //   },
    //   {
    //     placement: 2,
    //     name: 'Vico Martinez Eva',
    //     birthYear: 1998,
    //     category: 'SNR',
    //     weight: 68.13,
    //     squat: 165.0,
    //     benchPress: 109.5,
    //     deadlift: 195.0,
    //     total: 469.5,
    //     GLPoints: 97.98,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //     image: 'https://scontent.fvlc6-2.fna.fbcdn.net/v/t1.6435-9/105484668_3299942720065417_6649320804200786600_n.png?_nc_cat=109&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=Jr9vc97IDNkAX-xmcZZ&_nc_oc=AQl1GrM28PQBCooByibWG05TBicYrtZ_2utul8VoCkfZip7gkB2YDiQQkT-0RiJkkbk&_nc_ht=scontent.fvlc6-2.fna&oh=00_AfAjmp1W8ECZMZXixY_fY9kAR3oekTJnBMYe8DEpc77p7Q&oe=6590180C'
    //   },
    //   {
    //     placement: 3,
    //     name: 'Muiños Rivera Muriel',
    //     birthYear: 1998,
    //     category: 'SNR',
    //     weight: 68.39,
    //     squat: 170.0,
    //     benchPress: 92.5,
    //     deadlift: 177.5,
    //     total: 440.0,
    //     GLPoints: 91.61,
    //     championship: 'Europeo Powerlifting Raw',
    //     location: 'Skierniewice (POL)',
    //     date: '2022-12-04',
    //     gender: 'mujer',
    //   },
    //   {
    //     placement: 1,
    //     name: 'Sanchez-Manjavacas Ruiz Sara',
    //     birthYear: 1998,
    //     category: 'SNR',
    //     weight: 75.42,
    //     squat: 177.5,
    //     benchPress: 112.5,
    //     deadlift: 220.0,
    //     total: 510.0,
    //     GLPoints: 100.92,
    //     championship: 'Europeo Powerlifting Raw',
    //     location: 'Skierniewice (POL)',
    //     date: '2022-12-04',
    //     gender: 'mujer',
    //     image: 'https://www.elche.me/web/sites/default/files/styles/max_2600x2600/public/2023-07/sara%20sanchezmanjavacas.jpg?itok=Mynh_oZn'
    //   },
    //   {
    //     placement: 2,
    //     name: 'Erimo Sabadell Rosa',
    //     birthYear: 1992,
    //     category: 'SNR',
    //     weight: 73.39,
    //     squat: 170.0,
    //     benchPress: 95.0,
    //     deadlift: 207.5,
    //     total: 472.5,
    //     GLPoints: 94.74,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //     image: 'https://powerhispania.net/wp-content/uploads/2023/06/Rosa_Erimo_76kg_3.jpg'
    //   },
    //   {
    //     placement: 3,
    //     name: 'Gomez Ahumada Estela',
    //     birthYear: 1993,
    //     category: 'SNR',
    //     weight: 74.27,
    //     squat: 167.5,
    //     benchPress: 90.0,
    //     deadlift: 175.0,
    //     total: 432.5,
    //     GLPoints: 86.22,
    //     championship: 'Western European Cup',
    //     location: 'Aulnat, Francia',
    //     date: '2022-09-11',
    //     gender: 'mujer',
    //     image: 'https://powerhispania.net/wp-content/uploads/2023/06/M_Estela_Cuervo_52kg.jpg'
    //   },
    //   {
    //     placement: 1,
    //     name: 'Fuentes Tubella Paula',
    //     birthYear: 1998,
    //     category: 'SNR',
    //     weight: 81.73,
    //     squat: 180.0,
    //     benchPress: 90.0,
    //     deadlift: 197.5,
    //     total: 467.5,
    //     GLPoints: 89.25,
    //     championship: 'Copa España',
    //     location: 'Baza, Granada',
    //     date: '2022-11-06',
    //     gender: 'mujer',
    //     image: 'https://res.cloudinary.com/daxddugwt/image/upload/v1701359279/Captura_de_pantalla_2023-11-30_a_las_16.47.54_dza17g.png'
    //   },
    //   {
    //     placement: 2,
    //     name: 'Vargas Fernandez Serena',
    //     birthYear: 2000,
    //     category: 'JUN',
    //     weight: 83.26,
    //     squat: 175.0,
    //     benchPress: 95.5,
    //     deadlift: 195.0,
    //     total: 465.5,
    //     GLPoints: 88.21,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //     image: 'https://s3.ppllstatics.com/ideal/www/multimedia/202112/08/media/cortadas/svargas-2-kAqG-U160187952356enC-1248x770@Ideal.jpg'
    //   },
    //   {
    //     placement: 3,
    //     name: 'Cuevas Mulero Mila',
    //     birthYear: 1974,
    //     category: 'M1',
    //     weight: 83.7,
    //     squat: 170.0,
    //     benchPress: 82.5,
    //     deadlift: 213.0,
    //     total: 465.5,
    //     GLPoints: 88.03,
    //     championship: 'Europeo Másters Powerlifting Raw',
    //     location: 'Vilnius, Lituania',
    //     date: '2022-03-13',
    //     gender: 'mujer',
    //     image: 'https://www.psoeelpuerto.es/wp-content/uploads/2020/03/Foto-Mila-Cuevas-1.jpeg'
    //   },
    //   {
    //     placement: 1,
    //     name: 'Lara Benitez Maria',
    //     birthYear: 1993,
    //     category: 'SNR',
    //     weight: 0.0,
    //     squat: 155.0,
    //     benchPress: 95.0,
    //     deadlift: 172.5,
    //     total: 422.5,
    //     GLPoints: 79.73,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //   },
    //   {
    //     placement: 2,
    //     name: 'Soremekun Adenikke',
    //     birthYear: 1987,
    //     category: 'SNR',
    //     weight: 92.09,
    //     squat: 155.0,
    //     benchPress: 93.0,
    //     deadlift: 170.0,
    //     total: 418.0,
    //     GLPoints: 76.41,
    //     championship: 'XII Cpto España Absoluto Powerlifting Raw',
    //     location: 'Ibi, Alicante',
    //     date: '2022-04-03',
    //     gender: 'mujer',
    //   },
    //   {
    //     placement: 1,
    //     name: "Campano Díaz Iván",
    //     birthYear: 2001,
    //     category: "JUN",
    //     weight: 58.5,
    //     squat: 197.5,
    //     benchPress: 120.0,
    //     deadlift: 247.5,
    //     total: 565.0,
    //     GLPoints: 93.92,
    //     championship: "Mundial JUN-SBJ Powerlifting",
    //     location: "Estambul, Turquía",
    //     date: "2022-09-04",
    //     gender: "hombre",
    //     image: 'https://powerhispania.net/wp-content/uploads/2023/06/Ivan_Campano_59kg.jpg'
    //   },
    //   {
    //     placement: 2,
    //     name: "Quirante Pérez David",
    //     birthYear: 2001,
    //     category: "JUN",
    //     weight: 58.9,
    //     squat: 172.5,
    //     benchPress: 102.5,
    //     deadlift: 215.0,
    //     total: 490.0,
    //     GLPoints: 81.16,
    //     championship: "Mundial JUN-SBJ Powerlifting",
    //     location: "Estambul, Turquía",
    //     date: "2022-09-04",
    //     gender: "hombre",
    //     image: 'https://www.webdebaza.com/wp-content/uploads/2019/12/Campeonato-Europa-de-powerlifting-1.jpg'
    //   },
    //   {
    //     placement: 3,
    //     name: "Raposo Anton Victor Andres",
    //     birthYear: 1993,
    //     category: "SNR",
    //     weight: 57.41,
    //     squat: 147.5,
    //     benchPress: 90.0,
    //     deadlift: 200.0,
    //     total: 437.5,
    //     GLPoints: 73.46,
    //     championship: "Copa España",
    //     location: "Baza, Granada",
    //     date: "2022-11-06",
    //     gender: "hombre",
    //     image: 'https://somoslalacanti.com/wp-content/uploads/2023/06/DSC09625-1024x683.jpg'
    //   },
  
    //   {
    //     placement: 1,
    //     name: "Lopez Manzano Isidro",
    //     birthYear: 1981,
    //     category: "M1",
    //     weight: 65.32,
    //     squat: 170.0,
    //     benchPress: 112.5,
    //     deadlift: 225.0,
    //     total: 507.5,
    //     GLPoints: 79.53,
    //     championship: "Copa España",
    //     location: "Baza, Granada",
    //     date: "2022-11-06",
    //     gender: "hombre"
    //   },
    //   {
    //     placement: 2,
    //     name: "Dolz Sanchez Ignacio",
    //     birthYear: 1998,
    //     category: "SNR",
    //     weight: 63.99,
    //     squat: 185.0,
    //     benchPress: 112.5,
    //     deadlift: 202.5,
    //     total: 500.0,
    //     GLPoints: 79.25,
    //     championship: "Copa España",
    //     location: "Baza, Granada",
    //     date: "2022-11-06",
    //     gender: "hombre"
    //   },
    //   {
    //     placement: 3,
    //     name: "Garcia Molas Albert",
    //     birthYear: 2000,
    //     category: "JUN",
    //     weight: 65.06,
    //     squat: 177.5,
    //     benchPress: 115.0,
    //     deadlift: 190.0,
    //     total: 482.5,
    //     GLPoints: 75.80,
    //     championship: "España JUN-SBJ Powerlifting",
    //     location: "Carranque, Toledo",
    //     date: "2022-10-02",
    //     gender: "hombre"
    //   },
    //   {
    //     placement: 1,
    //     name: "Herraiz Francés Alberto",
    //     birthYear: 2000,
    //     category: "JUN",
    //     weight: 72.3,
    //     squat: 255.0,
    //     benchPress: 165.0,
    //     deadlift: 277.5,
    //     total: 697.5,
    //     GLPoints: 103.65,
    //     championship: "Europeo Powerlifting Raw",
    //     location: "Skierniewice (POL)",
    //     date: "2022-12-04",
    //     gender: "hombre",
    //     image: 'https://pozueloin.es/media/revistas/articulos/fotos/2022/01/12/alberto-herraiz-de-pozuelo-y-campeon-del-mundo-de-powerlifting-03.jpg'
    //   },
    //   {
    //     placement: 2,
    //     name: "Albadalejo Castro Marcos",
    //     birthYear: 2001,
    //     category: "JUN",
    //     weight: 73.27,
    //     squat: 242.5,
    //     benchPress: 140.0,
    //     deadlift: 285.0,
    //     total: 667.5,
    //     GLPoints: 98.50,
    //     championship: "Europeo Powerlifting Raw",
    //     location: "Skierniewice (POL)",
    //     date: "2022-12-04",
    //     gender: "hombre",
    //     image: 'https://media.licdn.com/dms/image/C4E03AQGyBrQzW0kL8w/profile-displayphoto-shrink_800_800/0/1661947391474?e=2147483647&v=beta&t=X5CtsYyUyE_0kc1rWvpisB9QGEUqqequCjYzmlmztZA'
    //   },
    //   {
    //     placement: 3,
    //     name: "Tordesillas Villarrubia Jose Manuel",
    //     birthYear: 1995,
    //     category: "SNR",
    //     weight: 73.52,
    //     squat: 235.0,
    //     benchPress: 150.0,
    //     deadlift: 272.5,
    //     total: 657.5,
    //     GLPoints: 96.85,
    //     championship: "XII Cpto España Absoluto Powerlifting Raw",
    //     location: "Ibi, Alicante",
    //     date: "2022-04-03",
    //     gender: "hombre"
    //   },
    //   {
    //     placement: 1,
    //     name: "Gomez Rives Jose Andres",
    //     birthYear: 1988,
    //     category: "SNR",
    //     weight: 80.9,
    //     squat: 292.5,
    //     benchPress: 162.5,
    //     deadlift: 290.0,
    //     total: 745.0,
    //     GLPoints: 104.45,
    //     championship: "XII Cpto España Absoluto Powerlifting Raw",
    //     location: "Ibi, Alicante",
    //     date: "2022-04-03",
    //     gender: "hombre"
    //   },
    //   {
    //     placement: 2,
    //     name: "Cortes Heredia Jaime",
    //     birthYear: 1996,
    //     category: "SNR",
    //     weight: 82.71,
    //     squat: 237.5,
    //     benchPress: 175.0,
    //     deadlift: 315.0,
    //     total: 727.5,
    //     GLPoints: 100.90,
    //     championship: "XII Cpto España Absoluto Powerlifting Raw",
    //     location: "Ibi, Alicante",
    //     date: "2022-04-03",
    //     gender: "hombre",
    //     image: 'https://powerhispania.net/wp-content/uploads/2023/06/Jaime_Cortes_83kg_2.jpg'
    //   },
    //   {
    //     placement: 3,
    //     name: "Lopez Llorente Jose",
    //     birthYear: 1999,
    //     category: "JUN",
    //     weight: 82.71,
    //     squat: 270.0,
    //     benchPress: 177.0,
    //     deadlift: 280.0,
    //     total: 727
    //   },
    //     {
    //       placement: 1,
    //       name: "Fuentes Medina Rubén",
    //       birthYear: 1995,
    //       category: "SNR",
    //       weight: 91.53,
    //       squat: 307.5,
    //       benchPress: 185.0,
    //       deadlift: 310.0,
    //       total: 802.5,
    //       GLPoints: 105.81,
    //       championship: "Europeo Powerlifting Raw",
    //       location: "Skierniewice (POL)",
    //       date: "2022-12-04",
    //       gender: "hombre",
    //       image: 'https://scontent.fvlc6-1.fna.fbcdn.net/v/t1.6435-9/71176303_2971517042923730_4793580301479575552_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=c2HVSC54tu4AX-RDwMe&_nc_ht=scontent.fvlc6-1.fna&oh=00_AfCV3-pf_CxnvllH_nOAplQwVdMrqVm8Lxgvm6x5IycEmw&oe=65903D39'
    //     },
    //     {
    //       placement: 2,
    //       name: "Rius i Pecamins Marc",
    //       birthYear: 1997,
    //       category: "SNR",
    //       weight: 92.05,
    //       squat: 275.0,
    //       benchPress: 172.5,
    //       deadlift: 345.0,
    //       total: 792.5,
    //       GLPoints: 104.20,
    //       championship: "Europeo Powerlifting Raw",
    //       location: "Skierniewice (POL)",
    //       date: "2022-12-04",
    //       gender: "hombre",
    //       image: 'https://yt3.googleusercontent.com/ytc/APkrFKbDLRgPO7HUuCqlv2GBJTrE0-aEALPPBPuHGF9Suw=s900-c-k-c0x00ffffff-no-rj'
    //     },
    //     {
    //       placement: 3,
    //       name: "Rodriguez Castro Ruben",
    //       birthYear: 1996,
    //       category: "SNR",
    //       weight: 91.95,
    //       squat: 300.5,
    //       benchPress: 177.5,
    //       deadlift: 310.0,
    //       total: 788.0,
    //       GLPoints: 103.62,
    //       championship: "Copa España",
    //       location: "Baza, Granada",
    //       date: "2022-11-06",
    //       gender: "hombre"
    //     },
    //     {
    //       placement: 1,
    //       name: "Pérez Barros Antonio",
    //       birthYear: 2001,
    //       category: "JUN",
    //       weight: 104.35,
    //       squat: 330.5,
    //       benchPress: 167.5,
    //       deadlift: 327.5,
    //       total: 825.5,
    //       GLPoints: 102.22,
    //       championship: "Mundial JUN-SBJ Powerlifting",
    //       location: "Estambul, Turquía",
    //       date: "2022-09-04",
    //       gender: "hombre"
    //     },
    //     {
    //       placement: 2,
    //       name: "Villacampa Estallo Daniel",
    //       birthYear: 1997,
    //       category: "SNR",
    //       weight: 104.18,
    //       squat: 280.0,
    //       benchPress: 175.0,
    //       deadlift: 340.0,
    //       total: 795.0,
    //       GLPoints: 98.50,
    //       championship: "Copa España",
    //       location: "Baza, Granada",
    //       date: "2022-11-06",
    //       gender: "hombre"
    //     },
    //     {
    //       placement: 3,
    //       name: "Nouredine Llurba Jordi",
    //       birthYear: 2002,
    //       category: "JUN",
    //       weight: 102.35,
    //       squat: 262.5,
    //       benchPress: 150.0,
    //       deadlift: 360.0,
    //       total: 772.5,
    //       GLPoints: 96.49,
    //       championship: "XII Cpto España Absoluto Powerlifting Raw",
    //       location: "Ibi, Alicante",
    //       date: "2022-04-03",
    //       gender: "hombre"
    //     },
    //     {
    //       placement: 1,
    //       name: "Vázquez Hdez-Carrillo Víctor",
    //       birthYear: 1995,
    //       category: "SNR",
    //       weight: 119.07,
    //       squat: 317.5,
    //       benchPress: 210.0,
    //       deadlift: 337.5,
    //       total: 865.0,
    //       GLPoints: 100.90,
    //       championship: "Europeo Powerlifting Raw",
    //       location: "Skierniewice (POL)",
    //       date: "2022-12-04",
    //       gender: "hombre",
    //       image: 'https://powerhispania.net/wp-content/uploads/2023/06/Victor_Vazquez_120kg.jpg'
    //     },
    //     {
    //       placement: 2,
    //       name: "Riudalbas Clemente Marc",
    //       birthYear: 1994,
    //       category: "SNR",
    //       weight: 118.07,
    //       squat: 277.5,
    //       benchPress: 195.0,
    //       deadlift: 320.0,
    //       total: 792.5,
    //       GLPoints: 92.80,
    //       championship: "XII Cpto España Absoluto Powerlifting Raw",
    //       location: "Ibi, Alicante",
    //       date: "2022-04-03",
    //       gender: "hombre"
    //     },
    //     {
    //       placement: 3,
    //       name: "Martin Rosales Jose Miguel",
    //       birthYear: 1994,
    //       category: "SNR",
    //       weight: 118.07,
    //       squat: 290.0,
    //       benchPress: 147.5,
    //       deadlift: 325.0,
    //       total: 762.5,
    //       GLPoints: 89.29,
    //       championship: "XII Cpto España Absoluto Powerlifting Raw",
    //       location: "Ibi, Alicante",
    //       date: "2022-04-03",
    //       gender: "hombre"
    //     },
    //     {
    //       placement: 1,
    //       name: "Rico Martín Rubén",
    //       birthYear: 1984,
    //       category: "SNR",
    //       weight: 199.60,
    //       squat: 380.0,
    //       benchPress: 230.0,
    //       deadlift: 335.0,
    //       total: 945.0,
    //       GLPoints: 91.16,
    //       gender: "hombre",
    //       image: 'https://powerhispania.net/wp-content/uploads/2023/06/Ruben_Rico_120kg_3.jpg'
    //     }
    //   ]



  module.exports= {
    powerlifters
  }