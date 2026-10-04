export type Resultado10k = {
  pos: number;
  dorsal: number;
  nombre: string;
  tiempo: string;
  ciudad: string;
  rama: "M" | "F";
  categoria: string;
  posCategoria: number;
};

export type Resultado2k = {
  pos: number;
  dorsal: number;
  nombre: string;
  tiempo: string;
  ciudad: string;
};

// Clasificación oficial de Sport Timer (12 de abril de 2026).
export const resultados10k: Resultado10k[] = [
  {
    "pos": 1,
    "dorsal": 37,
    "nombre": "Galeano Gustavo",
    "tiempo": "35:06",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "40 a 49 años",
    "posCategoria": 1
  },
  {
    "pos": 2,
    "dorsal": 30,
    "nombre": "Roy Chamo",
    "tiempo": "37:38",
    "ciudad": "Tunuyán",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 1
  },
  {
    "pos": 3,
    "dorsal": 22,
    "nombre": "Flores Tomas Gabriel",
    "tiempo": "39:53",
    "ciudad": "Ciudad",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 1
  },
  {
    "pos": 4,
    "dorsal": 7,
    "nombre": "Estrella Alfredo",
    "tiempo": "40:58",
    "ciudad": "Godoy Cruz",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 2
  },
  {
    "pos": 5,
    "dorsal": 12,
    "nombre": "Kark Augusto",
    "tiempo": "46:23",
    "ciudad": "Ciudad",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 2
  },
  {
    "pos": 6,
    "dorsal": 40,
    "nombre": "Fredes Javier",
    "tiempo": "46:41",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "40 a 49 años",
    "posCategoria": 2
  },
  {
    "pos": 7,
    "dorsal": 24,
    "nombre": "Tarquini Diego",
    "tiempo": "47:09",
    "ciudad": "Godoy Cruz",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 3
  },
  {
    "pos": 8,
    "dorsal": 32,
    "nombre": "Sanchez Ariel",
    "tiempo": "47:38",
    "ciudad": "Maipú",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 3
  },
  {
    "pos": 9,
    "dorsal": 10,
    "nombre": "Mercado Gaston",
    "tiempo": "47:52",
    "ciudad": "Luján",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 4
  },
  {
    "pos": 10,
    "dorsal": 35,
    "nombre": "Toti Jose",
    "tiempo": "49:28",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 4
  },
  {
    "pos": 11,
    "dorsal": 4,
    "nombre": "Hormazabal Enzo",
    "tiempo": "50:52",
    "ciudad": "Godoy Cruz",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 5
  },
  {
    "pos": 12,
    "dorsal": 34,
    "nombre": "Condori Brian",
    "tiempo": "51:14",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 5
  },
  {
    "pos": 13,
    "dorsal": 39,
    "nombre": "Rivera Emmanuel",
    "tiempo": "51:58",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 6
  },
  {
    "pos": 14,
    "dorsal": 38,
    "nombre": "Marchiotti Mariano",
    "tiempo": "52:04",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "60 y más años",
    "posCategoria": 1
  },
  {
    "pos": 15,
    "dorsal": 41,
    "nombre": "Perabo Pedro",
    "tiempo": "52:09",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 7
  },
  {
    "pos": 16,
    "dorsal": 33,
    "nombre": "Saldaña Emanuel",
    "tiempo": "52:47",
    "ciudad": "Maipú",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 6
  },
  {
    "pos": 17,
    "dorsal": 76,
    "nombre": "Rosselot Maria Clara",
    "tiempo": "52:51",
    "ciudad": "Las Heras",
    "rama": "F",
    "categoria": "30 a 39 años",
    "posCategoria": 1
  },
  {
    "pos": 18,
    "dorsal": 21,
    "nombre": "Arenas Santino",
    "tiempo": "53:35",
    "ciudad": "Ciudad",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 7
  },
  {
    "pos": 19,
    "dorsal": 68,
    "nombre": "Gil Paula Florencia",
    "tiempo": "54:17",
    "ciudad": "Godoy Cruz",
    "rama": "F",
    "categoria": "30 a 39 años",
    "posCategoria": 2
  },
  {
    "pos": 20,
    "dorsal": 2,
    "nombre": "Pastor Juan Carlos",
    "tiempo": "54:34",
    "ciudad": "Guaymallén",
    "rama": "M",
    "categoria": "50 a 59 años",
    "posCategoria": 1
  },
  {
    "pos": 21,
    "dorsal": 23,
    "nombre": "Garcia Fernando",
    "tiempo": "54:42",
    "ciudad": "Ciudad",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 8
  },
  {
    "pos": 22,
    "dorsal": 11,
    "nombre": "Marquez Luciano",
    "tiempo": "55:07",
    "ciudad": "Las Heras",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 8
  },
  {
    "pos": 23,
    "dorsal": 1,
    "nombre": "Vargas Lucas",
    "tiempo": "56:11",
    "ciudad": "Las Heras",
    "rama": "M",
    "categoria": "40 a 49 años",
    "posCategoria": 3
  },
  {
    "pos": 24,
    "dorsal": 50,
    "nombre": "Barrios Xiomara",
    "tiempo": "56:32",
    "ciudad": "Ciudad",
    "rama": "F",
    "categoria": "Hasta 29 años",
    "posCategoria": 1
  },
  {
    "pos": 25,
    "dorsal": 20,
    "nombre": "Donaire Tomas",
    "tiempo": "56:44",
    "ciudad": "Ciudad",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 9
  },
  {
    "pos": 26,
    "dorsal": 54,
    "nombre": "Mendoza Rosa Elizabeth",
    "tiempo": "59:54",
    "ciudad": "Guaymallén",
    "rama": "F",
    "categoria": "50 a 59 años",
    "posCategoria": 1
  },
  {
    "pos": 27,
    "dorsal": 27,
    "nombre": "Martin Ezequiel",
    "tiempo": "1:00:06",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 9
  },
  {
    "pos": 28,
    "dorsal": 64,
    "nombre": "Martinez Mariana",
    "tiempo": "1:00:52",
    "ciudad": "Malargüe",
    "rama": "F",
    "categoria": "30 a 39 años",
    "posCategoria": 3
  },
  {
    "pos": 29,
    "dorsal": 57,
    "nombre": "Martinez Andrea Veronica",
    "tiempo": "1:01:56",
    "ciudad": "Junín",
    "rama": "F",
    "categoria": "30 a 39 años",
    "posCategoria": 4
  },
  {
    "pos": 30,
    "dorsal": 75,
    "nombre": "Abbud Florencia",
    "tiempo": "1:02:23",
    "ciudad": "Guaymallén",
    "rama": "F",
    "categoria": "30 a 39 años",
    "posCategoria": 5
  },
  {
    "pos": 31,
    "dorsal": 8,
    "nombre": "Sanchez Lucas",
    "tiempo": "1:02:40",
    "ciudad": "Guaymallén",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 10
  },
  {
    "pos": 32,
    "dorsal": 56,
    "nombre": "Carobolante Graciela",
    "tiempo": "1:03:12",
    "ciudad": "Ciudad",
    "rama": "F",
    "categoria": "40 a 49 años",
    "posCategoria": 1
  },
  {
    "pos": 33,
    "dorsal": 59,
    "nombre": "Puebla Agustina Oriana",
    "tiempo": "1:03:46",
    "ciudad": "EE. UU.",
    "rama": "F",
    "categoria": "Hasta 29 años",
    "posCategoria": 2
  },
  {
    "pos": 34,
    "dorsal": 26,
    "nombre": "Torti Jeronimo",
    "tiempo": "1:04:20",
    "ciudad": "Godoy Cruz",
    "rama": "M",
    "categoria": "30 a 39 años",
    "posCategoria": 11
  },
  {
    "pos": 35,
    "dorsal": 71,
    "nombre": "Ridolfi Luciana",
    "tiempo": "1:05:32",
    "ciudad": "Godoy Cruz",
    "rama": "F",
    "categoria": "Hasta 29 años",
    "posCategoria": 3
  },
  {
    "pos": 36,
    "dorsal": 3,
    "nombre": "Felipe Matias",
    "tiempo": "1:06:23",
    "ciudad": "Maipú",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 10
  },
  {
    "pos": 37,
    "dorsal": 52,
    "nombre": "Pastor Emilce",
    "tiempo": "1:06:24",
    "ciudad": "Guaymallén",
    "rama": "F",
    "categoria": "Hasta 29 años",
    "posCategoria": 4
  },
  {
    "pos": 38,
    "dorsal": 66,
    "nombre": "Avillo Jimena",
    "tiempo": "1:06:48",
    "ciudad": "Maipú",
    "rama": "F",
    "categoria": "40 a 49 años",
    "posCategoria": 2
  },
  {
    "pos": 39,
    "dorsal": 63,
    "nombre": "Guisasola Camila",
    "tiempo": "1:06:58",
    "ciudad": "Dorrego",
    "rama": "F",
    "categoria": "Hasta 29 años",
    "posCategoria": 5
  },
  {
    "pos": 40,
    "dorsal": 6,
    "nombre": "Sechter Andres",
    "tiempo": "1:07:18",
    "ciudad": "Ciudad",
    "rama": "M",
    "categoria": "60 y más años",
    "posCategoria": 2
  },
  {
    "pos": 41,
    "dorsal": 53,
    "nombre": "Fracaro Natalia",
    "tiempo": "1:08:08",
    "ciudad": "Maipú",
    "rama": "F",
    "categoria": "50 a 59 años",
    "posCategoria": 2
  },
  {
    "pos": 42,
    "dorsal": 58,
    "nombre": "Medrano Silvana",
    "tiempo": "1:13:18",
    "ciudad": "Guaymallén",
    "rama": "F",
    "categoria": "40 a 49 años",
    "posCategoria": 3
  },
  {
    "pos": 43,
    "dorsal": 62,
    "nombre": "De Rodt Marina",
    "tiempo": "1:15:01",
    "ciudad": "Dorrego",
    "rama": "F",
    "categoria": "50 a 59 años",
    "posCategoria": 3
  },
  {
    "pos": 44,
    "dorsal": 77,
    "nombre": "Perez Javiera",
    "tiempo": "1:15:32",
    "ciudad": "Mendoza",
    "rama": "F",
    "categoria": "Hasta 29 años",
    "posCategoria": 6
  },
  {
    "pos": 45,
    "dorsal": 36,
    "nombre": "Muñoz Rafael",
    "tiempo": "1:15:34",
    "ciudad": "Mendoza",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 11
  },
  {
    "pos": 46,
    "dorsal": 65,
    "nombre": "Terrero Maria De Los Angeles",
    "tiempo": "1:16:10",
    "ciudad": "Ciudad",
    "rama": "F",
    "categoria": "Hasta 29 años",
    "posCategoria": 7
  },
  {
    "pos": 47,
    "dorsal": 25,
    "nombre": "Pivetta Renzo",
    "tiempo": "1:23:38",
    "ciudad": "Maipú",
    "rama": "M",
    "categoria": "Hasta 29 años",
    "posCategoria": 12
  }
];

export const resultados2k: Resultado2k[] = [
  {
    "pos": 1,
    "dorsal": 501,
    "nombre": "Bartolome Marcos",
    "tiempo": "25:26",
    "ciudad": "Guaymallén"
  },
  {
    "pos": 2,
    "dorsal": 527,
    "nombre": "Bazan Veronica",
    "tiempo": "27:55",
    "ciudad": "Ciudad"
  },
  {
    "pos": 3,
    "dorsal": 522,
    "nombre": "Buita Erica Isabel",
    "tiempo": "27:55",
    "ciudad": "Godoy Cruz"
  },
  {
    "pos": 4,
    "dorsal": 500,
    "nombre": "Pecoraro Agiustin",
    "tiempo": "30:13",
    "ciudad": "Ciudad"
  },
  {
    "pos": 5,
    "dorsal": 521,
    "nombre": "Villegas Cristina Soledad",
    "tiempo": "30:36",
    "ciudad": "Guaymallén"
  },
  {
    "pos": 6,
    "dorsal": 535,
    "nombre": "Garcia Sofia Valentina",
    "tiempo": "30:36",
    "ciudad": "Mendoza"
  },
  {
    "pos": 7,
    "dorsal": 539,
    "nombre": "Magne Belen",
    "tiempo": "31:43",
    "ciudad": "Mendoza"
  },
  {
    "pos": 8,
    "dorsal": 534,
    "nombre": "Roig Maria Del Carmen",
    "tiempo": "32:54",
    "ciudad": "Mendoza"
  },
  {
    "pos": 9,
    "dorsal": 533,
    "nombre": "Aguirre Valentina",
    "tiempo": "32:58",
    "ciudad": "Guaymallén"
  },
  {
    "pos": 10,
    "dorsal": 506,
    "nombre": "Antunez Jose Antonio",
    "tiempo": "37:40",
    "ciudad": "Mendoza"
  },
  {
    "pos": 11,
    "dorsal": 503,
    "nombre": "Kark Axel",
    "tiempo": "54:38",
    "ciudad": "Ciudad"
  },
  {
    "pos": 12,
    "dorsal": 532,
    "nombre": "Caputo Matilde",
    "tiempo": "55:11",
    "ciudad": "Ciudad"
  }
];
