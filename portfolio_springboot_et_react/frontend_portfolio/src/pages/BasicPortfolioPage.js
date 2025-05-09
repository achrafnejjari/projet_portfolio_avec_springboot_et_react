import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLinkedin } from 'react-icons/fa';

function BasicPortfolioPage() {
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem('user'));
    const [imageError, setImageError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Stored email:', email);
        if (!email) {
            setImageError('Email manquant dans localStorage');
            setLoading(false);
            return;
        }

        console.log('Fetching portfolio for email:', email);
        fetch(`http://localhost:8089/api/portfolio/${email}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched portfolio:', data);
                if (data && data.type === 'Basique') {
                    setPortfolio(data);
                    setImageError(null);
                } else {
                    setImageError('Aucun portfolio basique trouvé pour cet email');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du portfolio:', error);
                setImageError(`Erreur: ${error.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [email]);

    useEffect(() => {
        if (portfolio && portfolio.photoPath && email) {
            console.log('Fetching image from:', `http://localhost:8089/api/portfolio/image/${email}`);
            fetch(`http://localhost:8089/api/portfolio/image/${email}`)
                .then(response => {
                    console.log('Image fetch response status:', response.status);
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
                    }
                    setImageError(null);
                    console.log('Image fetch successful');
                    const img = new Image();
                    img.src = `http://localhost:8089/api/portfolio/image/${email}`;
                    img.onload = () => {
                        console.log('Image dimensions:', {
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        });
                        const imgElement = document.querySelector('.profile-img');
                        if (imgElement) {
                            const styles = window.getComputedStyle(imgElement);
                            console.log('Image computed styles:', {
                                background: styles.background,
                                overflow: styles.overflow,
                                zIndex: styles.zIndex
                            });
                        }
                    };
                })
                .catch(error => {
                    console.error('Erreur lors du chargement de l\'image:', error);
                    setImageError(error.message);
                });
        } else if (portfolio) {
            console.log('Conditions non remplies pour charger l\'image:', {
                hasPhotoPath: !!portfolio.photoPath,
                hasEmail: !!email
            });
            setImageError('PhotoPath ou email manquant');
        }
    }, [portfolio, email]);

    if (loading) {
        return (
            <div className="basic-portfolio text-center py-5">
                <h3 className="animate__animated animate__fadeIn">Chargement du portfolio...</h3>
            </div>
        );
    }

    if (!email || !portfolio) {
        return (
            <div className="basic-portfolio text-center py-5">
                <h3 className="animate__animated animate__fadeIn">Aucun portfolio trouvé</h3>
                <p>Veuillez vous connecter ou créer un portfolio basique.</p>
                <button
                    className="btn btn-primary animate__animated animate__pulse"
                    onClick={() => navigate('/portfolio-selection')}
                >
                    Retour à la sélection
                </button>
            </div>
        );
    }

    return (
        <div className="basic-portfolio">
            {/* Hero Section */}
            <section className="hero-section text-center py-5 animate__animated animate__fadeIn">
                <div className="container">
                    {portfolio.photoPath && !imageError ? (
                        <img
                            src={`http://localhost:8089/api/portfolio/image/${email}`}
                            alt="Profil"
                            className="profile-img mb-4"
                            onError={() => setImageError('Erreur de chargement de l\'image')}
                        />
                    ) : (
                        <div className="no-image mb-4">
                            Pas d'image
                            {imageError && <p className="text-danger mt-2">Erreur : {imageError}</p>}
                        </div>
                    )}
                    <h1 className="display-4 fw-bold mb-3">{portfolio.name}</h1>

                    <p className="description mx-auto">{portfolio.description}</p>
                    <div className="hero-buttons mt-4">
                        <button className="btn btn-outline-light" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                            Contactez-moi
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            {(portfolio.location || portfolio.phone || portfolio.email) && (
                <section className="about-section py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title text-center mb-5 animate__animated animate__fadeInUp">À propos</h2>
                        <div className="row g-4 justify-content-center">
                            {portfolio.location && (
                                <div className="col-md-4">
                                    <div className="info-card animate__animated animate__fadeInLeft">
                                        <h5>Localisation</h5>
                                        <p>{portfolio.location}</p>
                                    </div>
                                </div>
                            )}
                            {portfolio.phone && (
                                <div className="col-md-4">
                                    <div className="info-card animate__animated animate__fadeInUp">
                                        <h5>Contact</h5>
                                        <p>{portfolio.phone}</p>
                                    </div>
                                </div>
                            )}
                            {portfolio.email && (
                                <div className="col-md-4">
                                    <div className="info-card animate__animated animate__fadeInRight">
                                        <h5>Email</h5>
                                        <p>{portfolio.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {portfolio.linkedinUrl && (
                <section className="contact-section py-5">
                    <div className="container text-center">
                        <h2 className="section-title mb-5 animate__animated animate__fadeInUp">Contact</h2>
                        <div className="row g-4 justify-content-center">
                            {portfolio.linkedinUrl && (
                                <div className="col-md-4">
                                    <div className="contact-card animate__animated animate__fadeIn">
                                        <FaLinkedin size={24} className="mb-2" />
                                        <h5>LinkedIn</h5>
                                        <a href={portfolio.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                            Voir le profil
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Modifier Button */}
            <div className="modifier-button">
                <button
                    className="btn btn-primary animate__animated animate__pulse animate__infinite"
                    onClick={() => navigate('/portfolio-selection', { state: { type: 'Basique', portfolio } })}
                >
                    Modifier le Portfolio
                </button>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
                .basic-portfolio {
                    background: #f9fafb;
                    font-family: 'Roboto', sans-serif;
                    min-height: 100vh;
                    position: relative;
                }
                .hero-section {
                    background: linear-gradient(135deg, #4b5563, #9ca3af);
                    color: #fff;
                    padding: 80px 0;
                    position: relative;
                    overflow: visible;
                    z-index: 1;
                }
                .hero-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: url('https://www.transparenttextures.com/patterns/clean-textile.png');
                    opacity: 0.1;
                    z-index: -1;
                }
                .container {
                    overflow: visible;
                    position: relative;
                    z-index: 2;
                }
                .profile-img {
                    width: 150px;
                    height: 150px;
                    object-fit: contain;
                    border-radius: 50%;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    margin: 0 auto;
                    display: block;
                    z-index: 3;
                    transition: transform 0.3s ease;
                }
                .profile-img:hover {
                    transform: scale(1.1);
                }
                .no-image {
                    width: 150px;
                    height: 150px;
                    background: #d1d5db;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: #4b5563;
                    font-size: 1rem;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    margin: 0 auto;
                    z-index: 3;
                }
                .description {
                    max-width: 500px;
                    font-size: 1rem;
                    color: #e5e7eb;
                    margin: 0 auto;
                }
                .hero-buttons .btn-outline-light {
                    border-color: #fff;
                    color: #fff;
                    border-radius: 25px;
                    padding: 10px 25px;
                    font-weight: 600;
                    transition: background 0.3s ease, transform 0.3s ease;
                }
                .hero-buttons .btn-outline-light:hover {
                    background: #fff;
                    color: #4b5563;
                    transform: scale(1.05);
                }
                .section-title {
                    color: #374151;
                    font-weight: 700;
                    font-size: 2rem;
                }
                .info-card {
                    background: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    transition: transform 0.3s ease;
                    min-height: 160px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .info-card:hover {
                    transform: translateY(-5px);
                }
                .info-card h5 {
                    color: #374151;
                    margin-bottom: 8px;
                }
                .info-card p {
                    margin: 0;
                    color: #4b5563;
                    flex-grow: 1;
                }
                .contact-card {
                    background: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    transition: transform 0.3s ease;
                    min-height: 160px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .contact-card:hover {
                    transform: translateY(-5px);
                }
                .contact-card h5 {
                    color: #374151;
                    margin-bottom: 8px;
                }
                .contact-card a {
                    color: #4b5563;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .contact-card a:hover {
                    color: #374151;
                }
                .btn-primary {
                    background: #4b5563;
                    border: none;
                    border-radius: 25px;
                    padding: 10px 25px;
                    font-weight: 600;
                    color: #fff;
                    transition: background 0.3s ease, transform 0.3s ease;
                }
                .btn-primary:hover {
                    background: #374151;
                    transform: scale(1.05);
                }
                .bg-light {
                    background: #e5e7eb;
                }
                .modifier-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                .modifier-button .btn-primary {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }
                @media (max-width: 768px) {
                    .profile-img, .no-image {
                        width: 120px;
                        height: 120px;
                    }
                    .hero-section {
                        padding: 60px 0;
                    }
                    .description {
                        font-size: 0.9rem;
                    }
                    .section-title {
                        font-size: 1.8rem;
                    }
                    .info-card, .contact-card {
                        min-height: 180px;
                    }
                    .modifier-button {
                        bottom: 15px;
                        right: 15px;
                    }
                }
            `}</style>
        </div>
    );
}

export default BasicPortfolioPage;