
interface ShowItem {
  title: string;
  image: string;
  seasons: number;
  description: string;
  id: string;
  updated: string;
}

interface ShowsProps {
  item: ShowItem;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}


//Very simple stuff hear just a component that displays the shows in the home page, but is mainly used in the carousel component

export const formattedDate =(dateString:string|Date) =>{
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${year} ${month}(${date.getDate()})`;
}

  
  export const Shows = (props: ShowsProps) => {
    const { item, handleClick } = props;

    //When the show is clicked, the id of the show is passed to the handleClick function which is used to open the player modal
    //and gets the show's information based on the id passed
    return (
        <>
        <div className = "show" id={item.id} onClick={handleClick}>
        <img srcSet={item.image}  className="show-image"/>
        <div className="show-info">
          <p className="show-title">{item.title}</p>
          <div className="show-season">Seasons: {item.seasons}</div>
          <p className="updated">Updated: {formattedDate(item.updated)}</p>
          </div> 
          </div>
        </>  
    )
}

export default Shows





// "id": "10716",
//     "title": "Something Was Wrong",
//     "description": "Something Was Wrong is an Iris Award-winning true-crime docuseries about the discovery, trauma, and recovery from shocking life events and abusive relationships.",
//     "seasons": 14,
//     "image": "https://content.production.cdn.art19.com/images/cc/e5/0a/08/cce50a08-d77d-490e-8c68-17725541b0ca/9dcebd4019d57b9551799479fa226e2a79026be5e2743c7aef19eac53532a29d66954da6e8dbdda8219b059a59c0abe6dba6049892b10dfb2f25ed90d6fe8d9a.jpeg",
//     "genres": [1, 2],
//     "updated": "2022-11-03T07:00:00.000Z"


{/* <p className="preview__description">{item.description}</p> */}