import {
  LikeSVG,
  ViewSVG,
  CommentSVG,
  FollowersSVG,
  StatisticSVG,
} from "@User/utils/svg/HomeSvg";

export const packageDefinitions = {
  titleRu: "Продвижение вашего Instagram - аккаунта на новом уровне!",
  titleEn: "Boosting your Instagram account to a new level.",
  textRu: `Повысьте популярность вашего Instagram-аккаунта с помощью 
           наших комплексных услуг по продвижению! Выберите идеальный
           пакет услуг и количество постов, которые вам подходят. Все
           пакеты активны в течение 30 дней. Ваш пакет завершится по
           истечении этого срока или после использования выбранного
           вами количества постов. Просмотры, входящие в пакет,
           распространяются на [Video - IGTV - Reels]. Если вы хотите
           получить просмотры для Stories, их можно приобрести
           отдельно в разделе Услуги.`,
  textEn: `Increase the popularity of your Instagram account with our
           comprehensive promotion services. Choose the perfect service
           package and the number of posts that suit you. All packages
           are active for 30 days. Your package will end either after
           this period or once you have used the number of posts you selected.
           The views included in the package apply to [Video - IGTV - Reels].
           If you want to get views for Stories, they can be purchased separately
           in the Services section.`,
};

export const serviceDefinitions = [
  {
    logo: LikeSVG(),
    titleRu: "Лайки",
    titleEn: "Likes",
    className: "one",
    textRu: `Важный индикатор вовлеченности вашей аудитории.
            Чем больше лайков получают ваши публикации, тем шире охват.`,
    textEn: `An important indicator of your audience's engagement. 
            The more likes your posts receive, the wider your reach.`,
  },
  {
    logo: FollowersSVG(),
    titleRu: "Подписчики",
    titleEn: "Followers",
    className: "two",
    textRu: `Основной показатель успеха любого Instagram-аккаунта,
            они отражающий его популярность и востребованность.`,
    textEn: `The primary indicator of success for any Instagram account,
            reflecting its popularity and demand.`,
  },
  {
    logo: ViewSVG(),
    titleRu: "Просмотры",
    titleEn: "Views",
    className: "three",
    textRu: `Один из ключевых показателей. Они демонстрируют активность
            на вашем профиле и интерес к вашему контенту.`,
    textEn: `An equally important indicator. 
            Thanks to them, activity on your profile is visible.`,
  },
  {
    logo: CommentSVG(),
    titleRu: "Комментарии",
    titleEn: "Comments",
    className: "four",
    textRu: `При достаточном количестве, открывают путь в рекомендации
            и значительно улучшают общее ранжирование вашего профиля.`,
    textEn: `When they are sufficient in number, open the door to recommendations
            and significantly improve the overall ranking of your profile.`,
  },
  {
    logo: StatisticSVG(),
    titleRu: "Статистика",
    titleEn: "Statistics",
    className: "five",
    textRu: `Способствует повышению эффективности контента и укреплению
          взаимодействия с вашей аудиторией. Важные показатели включают охват,
          посещения, показы, репосты и сохранения.`,
    textEn: `Сontribute to increasing the effectiveness of your content and
            strengthening engagement with your audience. Key metrics include
            reach, visits, impressions, reposts, and saves.`,
  },
];
