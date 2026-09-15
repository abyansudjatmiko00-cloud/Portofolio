# ABYANNZ. — Personal Portfolio

Website personal portfolio yang dibuat menggunakan Next.js untuk menampilkan profil, pengalaman, perjalanan belajar, dan project yang telah dikerjakan.

## Teknologi yang Digunakan

- Next.js
- React
- TypeScript
- Tailwind CSS
- CSS
- JavaScript

## Fitur yang Ditambahkan

### 1. Tailwind CSS & Responsive Design

Project menggunakan Tailwind CSS dan styling tambahan untuk membuat tampilan website yang responsif serta mendukung tema terang dan gelap.

Pengujian responsive dilakukan menggunakan Chrome DevTools pada ukuran viewport 375px untuk memastikan tampilan dapat digunakan pada perangkat mobile tanpa horizontal overflow.

### 2. Komponen Website

Beberapa komponen yang dibuat dan digunakan dalam folder `src/components/`:

- `Navbar.tsx` — navigasi utama website serta pengaturan menu mobile dan tema.
- `Hero.tsx` — bagian utama halaman Home.
- `Intro.tsx` — bagian pengenalan profil.
- `HomeFocus.tsx` — bagian fokus dan keahlian pada halaman Home.
- `Footer.tsx` — bagian footer website.

Penggunaan komponen membantu membuat struktur kode lebih terorganisir dan dapat digunakan kembali.

### 3. Dynamic Route

Project menggunakan dynamic route Next.js untuk menampilkan detail project berdasarkan ID.

Struktur route:

```text
src/app/projects/[id]/page.tsx
```

Contoh URL:

```text
/projects/1
/projects/2
/projects/3
```

Setiap ID digunakan untuk mengambil data project yang sesuai dari:

```text
src/data/proyek.ts
```

### 4. Project Data

Data project disimpan dalam file:

```text
src/data/proyek.ts
```

Data menggunakan TypeScript interface `Proyek` dengan beberapa properti seperti:

- `id`
- `title`
- `description`
- `category`
- `image`
- `technologies`
- `link`

Project yang tersedia saat ini:

1. SIMMAG
2. Personal Portfolio
3. Library Website

### 5. Error 404

Project menggunakan `notFound()` dari Next.js untuk menangani project yang tidak ditemukan.

Halaman custom 404 berada pada:

```text
src/app/not-found.tsx
```

Contoh pengujian:

```text
/projects/999
```

Jika ID project tidak ditemukan, website akan menampilkan halaman custom 404.

### 6. Navigation

Website memiliki beberapa halaman utama:

```text
/
├── /about
├── /projects
└── /journey
```

Halaman detail project menggunakan dynamic route:

```text
/projects/[id]
```

Navigasi antar halaman menggunakan `next/link`.

## Struktur Folder

```text
src/
├── app/
│   ├── about/
│   ├── journey/
│   ├── projects/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HomeFocus.tsx
│   ├── Intro.tsx
│   └── Navbar.tsx
│
└── data/
    └── proyek.ts
```

## Cara Menjalankan Project

Pastikan Node.js sudah terinstall.

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Kemudian buka:

```text
http://localhost:3000
```

## Responsive Testing

Website telah diuji menggunakan Chrome DevTools pada ukuran viewport:

```text
375 × 689 px
```

Pengujian dilakukan untuk memastikan tampilan website tetap responsif pada perangkat mobile dan tidak mengalami horizontal overflow.

## 404 Testing

Pengujian halaman 404 dilakukan menggunakan URL project yang tidak tersedia:

```text
/projects/999
```

URL tersebut tidak memiliki project dengan ID 999 sehingga menampilkan halaman custom 404 dari:

```text
src/app/not-found.tsx
```

## Author

**Muhammad Abyan Sudjatmiko**

Web Developer & Creative Technologist

---

© 2026 ABYANNZ. All Rights Reserved.