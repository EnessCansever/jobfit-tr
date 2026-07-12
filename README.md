# JobFit TR

Junior geliştiriciler için iş ilanı uygunluk analizi ve başvuru takip paneli.

## Proje Özeti

JobFit TR, junior geliştiricilerin iş ilanlarını kendi teknik becerileriyle karşılaştırmasını, uygunluk skorunu görmesini ve başvuru süreçlerini tek yerden takip etmesini sağlayan local-first bir web uygulamasıdır.

Kullanım akışı şu şekildedir:

- Kullanıcı beceri profilini seçer.
- İş ilanı metnini uygulamaya ekler.
- Uygulama ilan metnindeki teknolojileri tespit eder.
- Tespit edilen teknolojiler kullanıcının becerileriyle eşleştirilir.
- Uygunluk skoru hesaplanır ve eksik beceriler listelenir.
- Kullanıcı ilanın başvuru durumunu takip edebilir.

Tüm veriler tarayıcının LocalStorage'ında saklanır; herhangi bir backend veya sunucu bileşeni bulunmaz.

## Özellikler

- Beceri profili oluşturma
- İş ilanı ekleme
- İlan metninden teknoloji tespiti
- Skill matching algoritması
- Uygunluk skoru hesaplama
- Eksik becerileri görme
- Başvuru durumu yönetimi:
  - Kaydedildi
  - Başvuruldu
  - Görüşme
  - Teknik Görüşme
  - Teklif
  - Olumsuz
- Dashboard istatistikleri:
  - Toplam ilan
  - Ortalama uygunluk
  - Görüşme aşaması
  - En çok eksik çıkan beceri
- Filtreleme:
  - Duruma göre filtreleme
  - %70+ uygun ilanlara göre filtreleme
- LocalStorage ile veri kalıcılığı
- Responsive modern dashboard tasarımı

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage
- lucide-react

## Teknik Detaylar

- Skill matching işlemi, ilan metni içindeki teknolojileri sabit bir teknoloji listesiyle karşılaştırarak tespit eder.
- Multi-word skill'ler için özel kontrol vardır: uzun skill'ler önce eşleştirilip metinden "tüketilir", böylece örneğin "Tailwind CSS" ifadesi geçerken içindeki "CSS" kelimesinin yanlışlıkla ayrı bir skill olarak yakalanması engellenmiştir.
- Fit score formülü:

  ```
  fitScore = (matchedSkills.length / requiredSkills.length) * 100
  ```

- Veriler backend olmadan doğrudan LocalStorage üzerinde saklanır.
- Uygulama local-first MVP olarak tasarlanmıştır.

## Ekran Görüntüleri

> Ekran görüntüleri eklenecek.

## Kurulum

```bash
git clone https://github.com/EnessCansever/jobfit-tr.git
cd jobfit-tr
npm install
npm run dev
```

Build almak için:

```bash
npm run build
```

## Proje Yapısı

```txt
src/
  components/
  data/
  hooks/
  types/
  utils/
```

- `components`: UI bileşenleri
- `data`: skill, status ve öneri listeleri
- `hooks`: custom hook'lar
- `types`: TypeScript type tanımları
- `utils`: analiz, formatlama ve istatistik hesaplama fonksiyonları

## Geliştirme Notları

Bu proje, özellikle junior frontend/full-stack başvuru sürecindeki gerçek bir problemi temel alır. Amaç yalnızca ilan kaydetmek değil, ilanın teknik gereksinimlerini görünür hale getirip adayın hangi konulara hazırlanması gerektiğini göstermektir.

## Roadmap

Aşağıdaki maddeler ileride eklenebilecek fikirlerdir, mevcut sürümde yer almaz:

- Dark mode
- CSV export
- Manuel skill seviyesi
- CV ile ilan karşılaştırma
- Backend ve kullanıcı hesabı
- AI destekli ilan analizi

## Geliştirici

Geliştirici: Enes Cansever

GitHub: [https://github.com/EnessCansever](https://github.com/EnessCansever)

LinkedIn: [https://www.linkedin.com/in/enes-cansever-478766244/](https://www.linkedin.com/in/enes-cansever-478766244/)

## Lisans

Bu proje portföy ve eğitim amaçlı geliştirilmiştir.
