import React, {useEffect, useState} from "react"
import axios from "axios";
const apiKey = "caad257514eb42068324ce4b4faa0bbd";

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}
function NewListItem({item}) {
  return (
    <div className="newsListItem" onClick={() => openInNewTab(item.url)}>
      <div className="itemImg">
        <img src={item.urlToImage}/>
      </div>
      <div className="w-100">
        {item.title}
      </div>
    </div>
  )

}
function Main() {
  const [news,setNews] = useState([]);
  const [pageSize,setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://newsapi.org/v2/everything?from=2022-05-29&to=2022-05-29&sortBy=popularity&apiKey=${apiKey}`, {
        params: {
          api_key: apiKey,
          pageSize: pageSize,
          q: searchValue || "apple"

        }
      })

      setNews(res.data.articles)
      console.log(res.data.articles);
    }
    catch (e) {
      console.error(e.response?.body);
    }
  }

  const onSearchButton = (e) => {
    e.preventDefault()
    fetchData()
  }

  useEffect(() => {
      fetchData()
  } ,[pageSize])
  return (
    <div className="newsList mb-5">
      <form onSubmit={onSearchButton}>
        <input placeholder="Search by title" onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
        <button onClick={onSearchButton} >Search</button>
      </form>
      {news.map((item, index) =>
        <NewListItem
          item={item}
          key={index}
        />
      )}
      {news.length < 40 &&
        <button
          onClick={()=>setPageSize(() => pageSize + 5)}
        >
          Load more...
        </button>}
    </div>
  );
}
export default Main;
