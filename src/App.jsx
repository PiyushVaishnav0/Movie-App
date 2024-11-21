import { Col, Container, Row } from 'react-bootstrap';
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

function App() {

  const [data, setData] = useState([])

  const [inputData, setInputdata] = useState(null)

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  let DisplayData = () => {

    let Api;

    if (inputData == null || inputData == "") {
      Api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}}`
    }
    else {
      Api = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${inputData}`
    }

    axios.get(Api)
      .then((ress) => {

        setData(ress.data.results)

      })
      .catch((error) => {

        setData(error.message)

      })

  }

  useEffect(() => {
    DisplayData()
  }, [inputData , currentPage])


  return (
    <>
      <div className='body'>
        <Container>

          <h1 className='py-3'>Movie Api</h1>

          <input className='w-100 my-1' value={inputData} onChange={(e) => setInputdata(e.target.value)} style={{ height: '40px' }} type='text' placeholder='Search' />

          <Row lg={4} md={3} xs={2} className=' justify-content-around w-100'>


            {data.map((v, i) => {
              return (

                <Col style={{ height: '600px' }} className='my-4'>
                  <Card className='my-4 mx-2 h-100'>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w1280${v.poster_path}`} className=' w-100 h-100 ' />
                    <Card.Body>
                      <Card.Title>{v.title}</Card.Title>
                      <Card.Text>
                        Vote Average : {v.vote_average}
                      </Card.Text>
                      <Button variant="primary">Releasing Date : {v.release_date}</Button>
                    </Card.Body>
                  </Card>
                </Col>

              )
            })}


          </Row>

          <div className='py-4'>
            <ResponsivePagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

        </Container>
      </div>
    </>
  )
}

export default App
