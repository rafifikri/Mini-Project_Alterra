import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getDetailDestinations } from "../../utils/apis/destination/api";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/destination/detail.css";

import Layout from "../../components/layout";

export default function DetailTour() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getDetailDestinations(id);
      setDetail(result);
    } catch (error) {
      console.log(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      {isLoading ? (
        <></>
      ) : (
        <div className="detail-page">
          <Container>
            <Row className="detail shadow-sm">
              <Col key={detail.id} data-aos="fade-up" data-aos-duration="1000">
                <div className="d-flex">
                  <div>
                    <img src={detail.image} alt="Tour Image" />
                  </div>
                  <div className="text">
                    <h2>{detail.destination}</h2>
                    <p className="animate__animated animate__fadeInUp animate__delay-0.8s">
                      {detail.description}
                    </p>
                    <div className="price d-flex justify-content-between align-items-center">
                      <p className="animate__animated animate__fadeInUp animate__delay-1s text-primary">
                        {detail.price}
                      </p>
                      <button
                        className="btn btn-success animate__animated animate__fadeInUp animate__delay-1s"
                        onClick={() => navigate("/transaction")}
                      >
                        Beli Tiket
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </Layout>
  );
}
