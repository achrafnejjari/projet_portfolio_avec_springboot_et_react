function Contact() {
    return (
        <div className="container my-5 py-5">
            <h1 className="display-4 text-center mb-5">Contactez-nous</h1>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Envoyez-nous un message</h3>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        <i className="fas fa-user me-2"></i>Nom
                                    </label>
                                    <input type="text" className="form-control" id="name" placeholder="Votre nom" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <i className="fas fa-envelope me-2"></i>Email
                                    </label>
                                    <input type="email" className="form-control" id="email" placeholder="Votre email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">
                                        <i className="fas fa-comment me-2"></i>Message
                                    </label>
                                    <textarea className="form-control" id="message" rows="5" placeholder="Votre message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="fas fa-paper-plane me-2"></i>Envoyer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <p className="lead">
                    Ou contactez-nous directement à :{' '}
                    <a href="mailto:support@portfoliocreator.com">support@portfoliocreator.com</a>
                </p>
                <p>
                    <i className="fas fa-phone me-2"></i>+33 123 456 789
                </p>
            </div>
        </div>
    );
}

export default Contact;