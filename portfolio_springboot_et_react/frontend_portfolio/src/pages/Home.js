import backgroundImage from '../assets/background.png';

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section
                className="d-flex align-items-center text-center text-white"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '80vh',
                    padding: '50px 20px'
                }}
            >
                <div className="container">
                    <h1 className="display-3 mb-4">Créez Votre Portfolio Parfait</h1>
                    <p className="lead mb-4">
                        Transformez vos compétences et projets en un portfolio professionnel en quelques clics.
                    </p>
                    <a href="/about" className="btn btn-primary btn-lg mx-2">
                        Commencer maintenant
                    </a>
                    <a href="/about" className="btn btn-outline-light btn-lg mx-2">
                        En savoir plus
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Pourquoi choisir Portfolio Creator ?</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <i className="fas fa-paint-brush fa-3x mb-3 text-primary"></i>
                            <h3>Personnalisation</h3>
                            <p>Choisissez parmi une variété de modèles élégants pour un portfolio unique.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="fas fa-user-friendly fa-3x mb-3 text-primary"></i>
                            <h3>Facilité d'utilisation</h3>
                            <p>Ajoutez vos projets et compétences avec une interface intuitive.</p>
                        </div>
                        <div className="col-md-4 text-center">
                            <i className="fas fa-share-alt fa-3x mb-3 text-primary"></i>
                            <h3>Partage</h3>
                            <p>Partagez votre portfolio avec des employeurs ou sur les réseaux sociaux.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;