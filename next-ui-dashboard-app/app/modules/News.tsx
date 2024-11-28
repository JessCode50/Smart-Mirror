const News = async () => {
  const data = await fetch(
    "https://newsdata.io/api/1/latest?apikey=pub_585756761adc3fda997c187e7ec49def8c62e&language=en&country=ca&category=sports,technology,education&prioritydomain=top&size=5&video=0&image=0&removeduplicate=1&excludedomain=news.google.com,9to5google.com"
  )

  interface ArticleInfo {
    source_name: string
    title: string
  }
  const articles: {
    results: Array<ArticleInfo>
  } = await data.json()

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 max-w-80">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold">NEWS</h1>
        </div>
        {articles.results.map((article: ArticleInfo, i: number) => (
          <article key={i} className="text-wrap">
            <h6 className="text-s">{article.source_name}</h6>
            <h1 className="text-xl font-bold">{article.title}</h1>
            <br></br>
          </article>
        ))}
      </div>
    </div>
  )
}

export default News
