function About() {
    return (
        <div className="container my-5 py-5">
            <h1 className="display-4 text-center mb-5">À propos de Portfolio Creator</h1>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                        alt="About Portfolio Creator"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h3>Notre mission</h3>
                    <p className="lead">
                        Portfolio Creator aide les utilisateurs à créer des portfolios professionnels, qu'ils soient étudiants, freelances, ou experts.
                    </p>
                    <p>
                        Avec des outils intuitifs et des modèles personnalisables, nous vous permettons de présenter vos compétences et projets de manière élégante pour impressionner vos futurs employeurs ou clients.
                    </p>
                    <a href="/create-portfolio" className="btn btn-primary">Créer votre portfolio</a>
                </div>
            </div>
        </div>
    );
}

export default About;