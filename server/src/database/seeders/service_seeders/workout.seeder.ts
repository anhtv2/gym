import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Workout } from '../../../entities/workout.entity';

export default class WorkoutsSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const workouts = [
      {
        name: 'Bài tập cổ tay với tạ tay',
        description:
          'Bài tập cơ cẳng tay, thực hiện bằng cách cuộn tạ tay bằng cổ tay.',
        duration: 30,
        thumbnail: 'https://liftmanual.com/wp-content/uploads/2023/04/dumbbell-standing-wrist-curl.jpg',
      },
      {
        name: 'Bài tập cuộn tạ tay',
        description:
          'Bài tập cơ bắp tay trước, thực hiện bằng cách cuộn tạ tay lên vai.',
        duration: 30,
        thumbnail: 'https://images.elipsport.vn/anh-seo-tin-tuc/2024/5/28/bai-tap-tay-truoc-voi-ta-don_.jpg',
      },
      {
        name: 'Kéo xà',
        description:
          'Bài tập cơ lưng, thực hiện bằng cách kéo cơ thể lên bằng thanh xà.',
        duration: 30,
        thumbnail: 'https://cdn-img.thethao247.vn/upload/thanhtung/2019/06/04/bai-tap-keo-xa-don-mau.jpg',
      },
      {
        name: 'Kéo cáp cơ tam đầu',
        description: 'Bài tập cơ tam đầu, thực hiện bằng cách kéo cáp xuống.',
        duration: 30,
        thumbnail: 'https://file.hstatic.net/1000185761/file/overheadextension_e499ec1a737f46388a490e46f266b120.jpg',
      },
      {
        name: 'Nâng tạ tay cho vai',
        description: 'Bài tập cơ vai, thực hiện bằng cách nâng tạ tay lên.',
        duration: 30,
        thumbnail: 'https://www.wheystore.vn/upload/news_optimize/wst_1670486709_7_bai_tap_vai_voi_ta_don_sieu_hieu_qua_cho_nguoi_tap_gym_image_1670486709_2.jpg',
      },
      {
        name: 'Đẩy ngực với tạ đòn',
        description: 'Bài tập cơ ngực, thực hiện bằng cách đẩy tạ đòn lên.',
        duration: 30,
        thumbnail: 'https://www.wheystore.vn/upload/news_optimize/wst_1611637058_8_bai_tap_nguc_voi_ta_don_tot_nhat_giup_co_nguc_phat_trien_toan_dien_image_1611637059_7.jpg',
      },
      {
        name: 'Gánh tạ',
        description: 'Bài tập cơ mông, thực hiện bằng cách gánh tạ.',
        duration: 30,
        thumbnail: 'https://www.thethaodaiviet.vn/upload/tap-squat-dung-cach-va-hieu-qua-1.jpg?v=1.0.0',
      },
      {
        name: 'Bài tập bụng với thảm',
        description: 'Bài tập cơ bụng, thực hiện trên thảm tập.',
        duration: 30,
        thumbnail: 'https://thethaominhphu.vn/wp-content/uploads/2019/01/Leg-Raises.jpg',
      },
      {
        name: 'Đẩy chân với máy',
        description: 'Bài tập cơ chân, thực hiện bằng cách đẩy chân với máy.',
        duration: 30,
        thumbnail: 'https://swequity.vn/wp-content/uploads/2019/11/bai-tap-Leg-Press.jpg',
      },
      {
        name: 'Nâng bắp chân với máy',
        description:
          'Bài tập cơ bắp chân, thực hiện bằng cách nâng bắp chân với máy.',
        duration: 30,
        thumbnail: 'https://www.thethaodaiviet.vn/upload/may-tap-da-chan-truoc-1.jpg?v=1.0.0',
      },
      {
        name: 'Chạy bộ trên máy',
        description:
          'Bài tập cardio, thực hiện bằng cách chạy bộ trên máy chạy.',
        duration: 30,
        thumbnail: 'https://cdn.tgdd.vn/Files/2020/10/22/1301165/huong-dan-chay-dung-cach-tren-may-chay-bo-trong-to-10.jpg',
      },
      {
        name: 'Đạp xe trên máy',
        description: 'Bài tập cardio, thực hiện bằng cách đạp xe trên máy.',
        duration: 30,
        thumbnail: 'https://cdn.tgdd.vn/Files/2020/10/24/1301636/huong-dan-cach-dap-xe-dung-cach-tren-xe-dap-tap-th-13.jpg',
      },
      {
        name: 'Kéo cáp ngực',
        description:
          'Bài tập cơ ngực, thực hiện bằng cách kéo cáp từ dưới lên.',
        duration: 30,
        thumbnail: 'https://fitstore.vn/wp-content/uploads/2021/10/cach-tap-cable-chest-press-2.jpg',
      },
      {
        name: 'Nâng tạ đòn qua đầu',
        description: 'Bài tập cơ vai, thực hiện bằng cách nâng tạ đòn qua đầu.',
        duration: 30,
        thumbnail: 'https://www.wheystore.vn/upload/news_optimize/wst_1605778639_overhead_press_la_gi__huong_dan_tap_overhead_press_dung_ky_thuat_image_1605778639_1.jpg',
      },
      {
        name: 'Nâng tạ tay bên',
        description:
          'Bài tập cơ vai, thực hiện bằng cách nâng tạ tay sang bên.',
        duration: 30,
        thumbnail: 'https://abcsport.com.vn/image/catalog/2022/T10-2022/nam-nen-tap-ta-tay-bao-nhieu-kg-3.jpg',
      },
      {
        name: 'Kéo xà đơn',
        description:
          'Bài tập cơ lưng, thực hiện bằng cách kéo cơ thể lên bằng thanh xà đơn.',
        duration: 30,
        thumbnail: 'https://www.wheystore.vn/upload/news_optimize/wst_1621914443_cach_hit_xa_don_dung_cach_cho_nguoi_moi_de_hit_duoc_nhieu_nhat_image_1621914443_1.jpg',
      },
      {
        name: 'Đẩy tạ đòn nằm nghiêng',
        description:
          'Bài tập cơ ngực trên, thực hiện bằng cách đẩy tạ đòn lên khi nằm trên ghế nghiêng.',
        duration: 30,
        thumbnail: 'https://kienthuctheduc.com/wp-content/uploads/2023/10/cach-nam-day-ta-don-tren-ghe-phang-hieu-qua-1280x720.jpg',
      },
      {
        name: 'Gánh tạ đòn phía trước',
        description:
          'Bài tập cơ đùi và mông, thực hiện bằng cách gánh tạ đòn phía trước.',
        duration: 30,
        thumbnail: 'https://www.thethaothientruong.vn/uploads/bai-tap-ganh-ta-don-02.jpg',
      },
      {
        name: 'Đẩy ngực với tạ tay',
        description: 'Bài tập cơ ngực, thực hiện bằng cách đẩy tạ tay lên.',
        duration: 30,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwShelY4O8aYyhmmwvjkwHVho70JhwjpFDbQ&s',
      },
      {
        name: 'Kéo cáp cao',
        description:
          'Bài tập cơ lưng, thực hiện bằng cách kéo cáp từ trên xuống.',
        duration: 30,
        thumbnail: 'https://www.thethaodaiviet.vn/upload/bai-tap-state-cable-row-1.jpg?v=1.0.0',
      },
    ];

    try {
      await dataSource.createEntityManager().save(Workout, workouts);
      console.log('Workouts seeding successful!');
    } catch (error) {
      console.error('Error occurred while seeding Workouts', error.message);
    }
  }
}
