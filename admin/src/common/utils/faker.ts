import _ from 'lodash'
import dayjs from 'dayjs'

interface User {
  name: string;
  gender: string;
  email: string;
}

interface Photo {
  fileName: string;
  type: string;
  size: string;
}

interface Date {
  date: string;
}

interface Time {
  time: string;
}

interface FormattedTime {
  formattedTime: string;
}

interface Total {
  total: number;
}

interface Stock {
  stock: number;
}

interface Product {
  name: string;
  category: string;
}

interface News {
  title: string;
  superShortContent: string;
  shortContent: string;
  content: string;
}

interface File {
  fileName: string;
  type: string;
  size: string;
}

interface Job {
  jobTitle: string;
}

interface Food {
  name: string;
  image: string;
}

interface FakerData {
  users: User[];
  photos: Photo[];
  dates: Date[];
  times: Time[];
  formattedTimes: FormattedTime[];
  totals: Total[];
  stocks: Stock[];
  products: Product[];
  news: News[];
  files: File[];
  jobs: Job[];
  notificationCount: number;
}

const fakers = {
  fakeUsers(): User[] {
    const users = [
      { name: 'Johnny Depp', gender: 'male' },
      { name: 'Al Pacino', gender: 'male' },
      { name: 'Robert De Niro', gender: 'male' },
      { name: 'Kevin Spacey', gender: 'male' },
      { name: 'Denzel Washington', gender: 'male' },
      { name: 'Russell Crowe', gender: 'male' },
      { name: 'Brad Pitt', gender: 'male' },
      { name: 'Angelina Jolie', gender: 'female' },
      { name: 'Leonardo DiCaprio', gender: 'male' },
      { name: 'Tom Cruise', gender: 'male' },
      { name: 'John Travolta', gender: 'male' },
      { name: 'Arnold Schwarzenegger', gender: 'male' },
      { name: 'Sylvester Stallone', gender: 'male' },
      { name: 'Kate Winslet', gender: 'female' },
      { name: 'Christian Bale', gender: 'male' },
      { name: 'Morgan Freeman', gender: 'male' },
      { name: 'Keanu Reeves', gender: 'male' },
      { name: 'Nicolas Cage', gender: 'male' },
      { name: 'Hugh Jackman', gender: 'male' },
      { name: 'Edward Norton', gender: 'male' },
      { name: 'Bruce Willis', gender: 'male' },
      { name: 'Tom Hanks', gender: 'male' },
      { name: 'Charlize Theron', gender: 'female' },
      { name: 'Will Smith', gender: 'male' },
      { name: 'Sean Connery', gender: 'male' },
      { name: 'Keira Knightley', gender: 'female' },
      { name: 'Vin Diesel', gender: 'male' },
      { name: 'Matt Damon', gender: 'male' },
      { name: 'Richard Gere', gender: 'male' },
      { name: 'Catherine Zeta-Jones', gender: 'female' },
    ]

    return _.sampleSize(users, 3).map((user) => {
      return {
        name: user.name,
        gender: user.gender,
        email: _.toLower(_.replace(user.name, / /g, '') + '@left4code.com'),
      }
    });
  },
  fakePhotos(): Photo[] {
    const photos: Photo[] = []
    for (let i = 0; i < 15; i++) {
      photos.push({
        fileName: 'profile-' + _.random(1, 15) + '.jpg',
        type: 'Image',
        size: '1.2 MB',
      })
    }
    return _.sampleSize(photos, 10)
  },
  fakeDates(): Date[] {
    const dates: Date[] = []
    for (let i = 0; i < 5; i++) {
      dates.push({
        date: dayjs
          .unix(_.random(1586584776897, 1672333200000) / 1000)
          .format('DD MMMM YYYY'),
      })
    }
    return _.sampleSize(dates, 3)
  },
  fakeTimes(): Time[] {
    const times: Time[] = [
      { time: '01:10 PM' },
      { time: '05:09 AM' },
      { time: '06:05 AM' },
      { time: '03:20 PM' },
      // Add more time data...
    ]
    return _.sampleSize(times, 3)
  },
  fakeFormattedTimes(): FormattedTime[] {
    const times: FormattedTime[] = [
      { formattedTime: _.random(10, 60) + ' seconds ago' },
      { formattedTime: _.random(10, 60) + ' minutes ago' },
      // Add more formatted time data...
    ]
    return _.sampleSize(times, 3)
  },
  fakeTotals(): Total[] {
    return _.shuffle([
      { total: _.random(20, 220) },
      { total: _.random(20, 120) },
      { total: _.random(20, 50) },
    ])
  },
  fakeStocks(): Stock[] {
    return _.shuffle([
      { stock: _.random(50, 220) },
      { stock: _.random(50, 120) },
      { stock: _.random(50, 50) },
    ])
  },
  fakeProducts(): Product[] {
    const products: Product[] = [
      { name: 'Dell XPS 13', category: 'PC & Laptop' },
      { name: 'Apple MacBook Pro 13', category: 'PC & Laptop' },
      { name: 'Oppo Find X2 Pro', category: 'Smartphone & Tablet' },
      { name: 'Samsung Galaxy S20 Ultra', category: 'Smartphone & Tablet' },
      { name: 'Sony Master Series A9G', category: 'Electronic' },
      { name: 'Samsung Q90 QLED TV', category: 'Electronic' },
      { name: 'Nike Air Max 270', category: 'Sport & Outdoor' },
      { name: 'Nike Tanjun', category: 'Sport & Outdoor' },
      { name: 'Nikon Z6', category: 'Photography' },
      { name: 'Sony A7 III', category: 'Photography' },
    ]
    return _.shuffle(products)
  },
  fakeNews(): News[] {
    const news: News[] = [
      {
        title: 'Desktop publishing software like Aldus PageMaker',
        superShortContent: _.truncate('...', { length: 30, omission: '' }),
        shortContent: _.truncate('...', { length: 150, omission: '' }),
        content: '...',
      },
      // Add more news data...
    ]
    return _.shuffle(news)
  },
  fakeFiles(): File[] {
    const files: File[] = [
      { fileName: 'Celine Dion - Ashes.mp4', type: 'MP4', size: '20 MB' },
      { fileName: 'Laravel 7', type: 'Empty Folder', size: '120 MB' },
      { fileName: 'Repository', type: 'Folder', size: '20 KB' },
      { fileName: 'Resources.txt', type: 'TXT', size: '2.2 MB' },
      { fileName: 'Routes.php', type: 'PHP', size: '1 KB' },
      { fileName: 'Dota 2', type: 'Folder', size: '112 GB' },
      { fileName: 'Documentation', type: 'Empty Folder', size: '4 MB' },
    ]
    return _.shuffle(files)
  },
  fakeJobs(): Job[] {
    const jobs: Job[] = [
      { jobTitle: 'Web Developer' },
      { jobTitle: 'Web Designer' },
      // Add more job data...
    ]
    return _.shuffle(jobs)
  },
  fakeNotificationCount(): number {
    return _.random(1, 10)
  },
}

const fakerData: FakerData[] = []
for (let i = 0; i < 20; i++) {
  fakerData.push({
    users: fakers.fakeUsers(),
    photos: fakers.fakePhotos(),
    dates: fakers.fakeDates(),
    times: fakers.fakeTimes(),
    formattedTimes: fakers.fakeFormattedTimes(),
    totals: fakers.fakeTotals(),
    stocks: fakers.fakeStocks(),
    products: fakers.fakeProducts(),
    news: fakers.fakeNews(),
    files: fakers.fakeFiles(),
    jobs: fakers.fakeJobs(),
    notificationCount: _.random(1, 10),
  })
}

const install = (app: any) => {
  app.config.globalProperties.$f = () => {
    return fakerData
  };
};

export { install as default, fakerData as faker }
