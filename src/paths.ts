const paths = {
  home() {
    return "/";
  },
  photos() {
    return "/photos";
  },
  events() {
    return "/events";
  },
  createAlbumForm() {
    return "/create-album-form";
  },
  album(albumId: string) {
    return `/album/${albumId}`;
  },
};

export default paths;
