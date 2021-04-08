import GlassesMen from './../../assets/GlassesMen.png';
import GlassesWomen from './../../assets/GlassesWomen.png';
import './styles.scss';


const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${GlassesWomen})`
                    }}
                >
                    <a>
                        Shop Womens
                    </a>
                </div>
                
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${GlassesMen})`
                    }}
                >
                    <a>
                        Shop Mens
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Directory;