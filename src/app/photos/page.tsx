import AlbumCard from "./album-card";
import Me from "../../../public/michael.jpg";

export default function Photos() {
  return (
    <div className='photos'>
      <AlbumCard
        name='Test Album'
        description='Test description'
        image={Me.src}
      />
    </div>
  );
}
