import './App.css';
import {useEffect, useState} from "react"

function App() {
  const [products, setProducts] = useState([]);

  const [page,SetPage] = useState(1)

  const fetchData = async ()=>{
    const res=  await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json();
    if(data && data.products)
      setProducts(data.products)
  }
  const selectPageHandler = (selectedPage) => {
    if(selectedPage>=1 && selectedPage<=products.length/10 && page!==selectedPage)
    SetPage(selectedPage)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="App">{
      products.length>0 && <div className="products">{
      products.slice(page*10-10,page*10).map((item)=> {
        return <span className='product__single' key={item.id}>
          <img src={item.thumbnail} alt={item.title}></img>
          <span>{item.title}</span>
        </span>
      })}</div>
    }
    {products.length>0 && <div className='pagination'>
      <span className={page==1 ? "page_disable":""} onClick={()=> selectPageHandler(page-1)}>⬅️</span>
      {[...Array(products.length/10)].map((_,i)=> {
        return <span className={page===i+1 ? "selectedPage" :" " } key={i} onClick={()=>selectPageHandler(i+1)}>{i+1}</span>
      })}
      <span className={page==10 ? "page_disable":""} onClick={()=> selectPageHandler(page+1)}>➡️</span>
      </div>}
    </div>
  );
}

export default App;
