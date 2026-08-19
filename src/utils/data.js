import { allNews, sportsData, socialData, entertainmentData } from "../data"

export const getAllNews = () => {
  return [
    ...allNews,
    ...(sportsData.national.football || []),
    ...(sportsData.national.martialArts || []),
    ...(sportsData.national.otherSports || []),
    ...(sportsData.international.asia || []),
    ...(sportsData.international.economy || []),
    ...(socialData.national.politics || []),
    ...(socialData.national.economy || []),
    ...(entertainmentData.national.movies || []),
    ...(entertainmentData.national.music || []),
    ...(entertainmentData.international.items || [])
  ]
}