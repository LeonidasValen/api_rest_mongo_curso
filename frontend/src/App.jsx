import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Books } from './pages/showbooks/books';
import { Add } from './pages/addbook/add';
import { Edit } from './pages/editbook/edit';
import { DetailsProductoc } from './pages/detailbook/detailBook';
import { Header } from './components/header/header';

export const URI = "YOUR HOST BACKEND"

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Books URI={URI}/>}/>
        <Route path='/book/:id' element={<DetailsProductoc URI={URI} />} />
        <Route path='/add' element={<Add URI={URI}/>}/>
        <Route path='/edit/:id' element={<Edit URI={URI}/>}/>
      </Routes>
    </Router>
  )
}

export default App
