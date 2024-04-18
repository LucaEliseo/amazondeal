import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Pagination, Input } from 'antd';

const apiKey = 'Inserisci la tua api';
const apiUrl = 'https://real-time-amazon-data.p.rapidapi.com/search';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const country = 'IT';
    const categoryId = '12345';
    const pageSize = 9; // Vedere riga 78

    useEffect(() => {
        fetchAmazonData(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const fetchAmazonData = async (page, query) => {
        try {
            const response = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}&country=${country}&category_id=${categoryId}&page=${page}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                throw new Error('Errore durante la richiesta');
            }

            const data = await response.json();
            console.log(data);
            setProducts(data.data.products || []);
            setTotalProducts(data.data.total_products || 0);
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Da rivedere poiche si effettuano troppe richeste per una singola ricerca
    };

    return (
        <>
            <div className='filterForm'>
                <Input placeholder='Cerca il prodotto in offerta' onChange={handleInputChange} value={searchTerm}></Input>
            </div>
            <Row gutter={[16, 16]} style={{ padding: '3em', width: '100%',  }}>
                {products.slice(0, pageSize).map(product => (product.product_original_price && (
                    <Col key={product.asin} xs={24} sm={12} md={8} lg={8}>
                        <Card className='card' title={product.product_title} cover={<img alt="Product" src={product.product_photo} style={{ height: '200px', objectFit: 'contain', marginTop: '20px', }} />}  >
                            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Prezzo: {product.product_price}</p>
                            <p >Prezzo Minimo: {product.product_minimum_offer_price}</p>
                            <p >Prezzo Originale: {product.product_original_price}</p>
                            <p >Rating: {product.product_star_rating}</p>
                            <p >Ultime Vendite : {product.sales_volume || 'Dato non disponibile'}</p>
                            <a href={product.product_url} target="_blank" rel="noopener noreferrer"   >Acquista  </a>
                        </Card>
                    </Col>
                )
                ))}
            </Row>
            {/* Bug nella paginazione dovuto probabilmente && del map*/}
            <div style={{ textAlign: 'center', marginTop: '1em', marginBottom: '2em', }}>
                <Pagination current={currentPage} total={totalProducts} pageSize={pageSize} onChange={handlePageChange} />  
            </div>
        </>
    );
};

export default Product;
