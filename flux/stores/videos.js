module.exports = {
  getInitialState() {
    return {
      isLoading: false,
      notFound: false,
      data: []
    };
  },
  handlers: {
    ADD_VIDEO_TO_LIST(context, payload) {
      let newState = this.state.data.concat([payload]);
      
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: newState
      });
    },
    REMOVE_VIDEO_FROM_LIST(context, id) {
      let video = this.state.data.slice().filter((video) => {
        return video.id === id;
      })[0];

      if (!video) {
        return; 
      }

      let newState = this.state.data.slice();
      newState.splice(newState.indexOf(video), 1);
      
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: newState
      });
    },
    POPULATE_VIDEOS_DATA(context, payload) {
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: payload
      });
    },
    POPULATE_VIDEOS_DATA_FAIL(context, payload) {
      this.setState({
        notFound: true
      });
    }
  }
};
