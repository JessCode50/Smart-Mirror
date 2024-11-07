const News = async() => {
  let data = await fetch('https://newsdata.io/api/1/latest?apikey=pub_585756761adc3fda997c187e7ec49def8c62e&language=en&country=ca&category=sports,technology,education&prioritydomain=top&size=3&video=0&image=0&removeduplicate=1&excludedomain=news.google.com,9to5google.com')
  let articles = await data.json()
  
  let title1 = articles.results[0].title
  let title2 = articles.results[1].title
  let title3 = articles.results[2].title

  let source1 = articles.results[0].source_name
  let source2 = articles.results[1].source_name
  let source3 = articles.results[2].source_name

  return <div><h6 className="text-s"> {source1} </h6>
    <h1 className="text-xl font-bold">{title1}</h1>
    <br></br>
    <h6 className="text-x"> {source2} </h6>
    <h1 className="text-xl font-bold">{title2}</h1>
    <br></br>
    <h6 className="text-x"> {source3} </h6>
    <h1 className="text-xl font-bold">{title3}</h1>
    </div>
}

export default News
