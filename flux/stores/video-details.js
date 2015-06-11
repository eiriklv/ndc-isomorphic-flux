module.exports = {
  getInitialState() {
    return {
      isLoading: false,
      notFound: false,
      data: {}
    };
  },
  handlers: {
    POPULATE_SELECTED_VIDEO_DATA(context, payload) {
      this.replaceState({
        isLoading: false,
        notFound: false,
        data: payload
      });
    },
    SET_SELECTED_VIDEO_AS_LOADING(context) {
      this.replaceState({
        isLoading: true,
        notFound: false,
        data: {}
      });
    },
    SET_SELECTED_VIDEO_AS_NOT_FOUND(context) {
      this.replaceState({
        isLoading: false,
        notFound: true,
        data: {}
      });
    }
  }
};
