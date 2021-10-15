import React from "react";
import {Card, Col, Row, Container, Nav} from "react-bootstrap"
import "../../assets/styles/blog/post.css"
import like from "../../assets/static/icons/home/like.svg"
import share from "../../assets/static/icons/home/share.svg"
import save from "../../assets/static/icons/home/save.svg"
import blog_2 from "../../assets/static/backgrounds/home/blog_3.jpg"
import blog_1 from "../../assets/static/backgrounds/home/blog_1.png"
import Loading from "../../components/reused/Loading"
import Header from "../../components/main/Header"
import Footer from "../../components/main/Footer"

class Post extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 2000);
          return() => clearTimeout(timer)
    }

    render(){
        return(
            <div className="post">
            {this.state.isLoading ? <Loading />
            :
            <div className="post-page">
                <img src={blog_2} alt="blog_2" width="100%" height="500px"></img>
                <div className="cont">
                    <h1>How traveling affects your life</h1>
                </div>
                <Container>
                <p>Although the first official reference to overseas mail arrangements (concerning the receipt of overseas mail at Fairbanks’ Tavern in Boston) dates to 1639, little real progress was made in building a postal system in colonial America until the appointment of Benjamin Franklin, formerly postmaster at Philadelphia, as deputy postmaster general for the American Colonies in 1753. Through diligent personal survey and inspection, he provided a more extensive, frequent, and speedier mail service, both within the Colonies and to England. Franklin built a sound foundation for the postal service in the United States, and, fittingly, he became its first postmaster general in 1775.

<br></br>Postal service expanded rapidly after independence: annual revenue increased from $37,935 in 1790 to $1,707,000 by 1829, when the postmaster general first became a member of the Cabinet. The heavy cost of establishing a postal structure to keep pace with the remarkable economic progress of the country and the accelerating extension of its settled area caused expenditure to rise even faster than revenue. The trend toward annual postal deficits, which began in the 1820s, often exceeded an annual figure of $5,000,000 later in the 19th century.

<br></br>By 1901, however, this expenditure had produced remarkable results. The accessibility, quality, and range of services provided had improved immeasurably. The number of post offices stood at a peak of 76,945. Postage rates had been considerably reduced with the gradual adoption of the principles of Rowland Hill: a single uniform rate regardless of distance was adopted in 1863 (after an interim period with two rates since 1845), and postage stamps were introduced in 1847. Free collection services came with the provision of street letter boxes in 1858. A free delivery service was established in 1863, covering 49 cities and employing 440 letter carriers. By 1900 the service was provided at 796 offices by 15,322 carriers. The rural free delivery (RFD) service was introduced in 1896 and town delivery in 1912. These delivery services have greatly expanded their scope. The vast majority of mail is delivered by carriers, about one-tenth through post-office boxes, and only a small fraction at windows or counters.

<br></br>The range of services available to the public has also grown steadily since the first supplementary postal service, registered mail, was introduced in 1855. The major milestones in this progress were postal money order service (1864); international money orders (1867); special delivery (1885); parcel post, with its accessory collect on delivery (COD) and insurances services (1913); and certified mail (1955), which provides proof of posting for items without intrinsic value. In 1911 a postal savings system was inaugurated, reaching a peak of more than 4,000,000 accounts in 1947. A decline to less than 1,000,000 depositors caused the service to be discontinued in 1966. Mail was formally divided into three classes in 1863, and a fourth was added in 1879. First-class, or letter, mail (called letter post in the United Kingdom) is the basis of the postal service monopoly and, as the class of mail most commonly used by the public, has generally had a simplified rate structure. The other classes were established according to mail content: second-class consists of newspapers and magazines, third-class encompasses other printed matter and merchandise weighing less than one pound, and fourth-class mail is either merchandise or printed matter that weighs one pound or more. The addition of these classes allowed the post office to adopt more complicated rate structures that would take into account factors affecting handling costs—such as the weight of the piece and the distance it would be conveyed. Second-class mail receives preferential rates because the dissemination of information through newspapers and other publications is considered to serve the public interest.

<br></br>The post office has played a vital role as a pioneer and major user of all systems of transport as each was developed: the stagecoach, steamboat, canals, and railroads; the short-lived Pony Express; and airlines and motor vehicles. It also helped subsidize their development. A traveling post-office system, in which mail could be sorted in transit, was introduced experimentally in 1862, and it made railway mail service the dominant form of mail conveyance well into the 20th century. The gradual reduction of passenger train services during the 1930s led to the birth of a highway post-office service in 1941. Both of these services declined rapidly in the 1950s and 1960s. Railway post-office mileage was reduced from 96,400,000 in 1965 to 10,100,000 in 1969, and the number of highway post offices in operation during that period fell from 163 to none. Conversely, annual ton-miles of airmail flown grew from 188,103,000 in 1965 to more than 1,000,000,000 by the 1980s, indicating the significant trend toward air transportation of regular mail without surcharge.

<br></br>The United States maintains the largest postal system in the world, handling almost half the world’s volume of postal traffic. To deal with the problem of increasing deficits and to improve the overall management and efficiency of the post office, the U.S. Congress approved the Postal Reorganization Act of 1970, signed into law August 12, 1970. The act transformed the Post Office Department into a government-owned corporation, called the United States Postal Service. Congress no longer retains power to fix postal tariffs (although changes may be vetoed) or to control employees’ salaries, and political patronage has been virtually eliminated. Government subsidies continued on a declining basis until 1982, after which the U.S. Postal Service itself no longer received a direct subsidy from Congress. An indirect subsidy is still paid for certain mailers, however. These mailers, primarily nonprofit organizations or small publishers, pay lower rates than others, with Congress making up the difference in cost. The corporation has authority to raise capital to modernize its equipment and buildings. It is also subject to competition from private companies, a situation that in 1977 led to the introduction of Express Mail, which guaranteed overnight delivery.

<br></br>The availability of adequate funds for its mechanization and automation program has allowed the post office to benefit considerably from its sustained effort in research and development. More than half of all letter mail is handled by preparation and sorting machines, a trend greatly assisted by the ZIP (Zone Improvement Plan) Code program, which has come to be almost universally used.

<br></br><br></br>Great Britain
<br></br>The development of the British post office up to the reforms introduced by Rowland Hill has already been described. After 1840 the volume of postal traffic increased enormously and by 1870 had reached 10 times its prereform level. The growth was fostered by the introduction of new facilities, such as registration and postcards, and of preferential rates for books, printed papers, and samples. Financial services were also expanded: a savings bank was established in 1861, and postal orders were introduced in 1881 to supplement the money order service taken over from private interests in 1838. In 1883 a parcel post service was established.

<br></br>The sweeping social reforms of the 20th century have given the post office an additional role as the chief payment agency for social security benefits, beginning with old-age pensions in 1908. This has been expanded to provide a variety of payments and also to collect large sums for state insurance schemes. The scale and range of financial transactions have been further boosted by the establishment in 1968 of the post office’s banking arm, National Girobank, which provides an improved money transfer arrangement for the settlement of bills, as well as an account banking system and loan facilities.</p>
            </Container>
            </div>
            }
            </div>
        );
    }
}

export default (Post)