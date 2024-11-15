const News = async () => {
  const data = await fetch(
    "https://newsdata.io/api/1/latest?apikey=pub_585756761adc3fda997c187e7ec49def8c62e&language=en&country=ca&category=sports,technology,education&prioritydomain=top&size=3&video=0&image=0&removeduplicate=1&excludedomain=news.google.com,9to5google.com",
  )
  const articles:any = await data.json()

  return (
    <div className="grid grid-cols-1 gap-4 max-w-80">
      {
        articles.results.map(article => (
          
          <article className="text-wrap">
            <h6 className="text-s">{article.source_name}</h6>
            <h1 className="text-xl font-bold">{article.title}</h1>
            <br></br>
          </article>
        ))
      }
      
    </div>
  )
}

export default News
