import "./Home.css";
const Home = () => {
    return (
        <>
            <h1 className="homepage-title">Welcome to our messaging app</h1>
            <div className="homepage-content">
                <h1 className="homepage-title2">
                    Here is what you can expect:
                </h1>
                <span className="homepage-message">
                    Find new users and connect
                </span>
                <span className="homepage-message">
                    Access your personal page
                </span>
                <span className="homepage-message">
                    Browse your current messages
                </span>
            </div>
        </>
    );
};

export default Home;
