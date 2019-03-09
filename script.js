
const moment = window.moment;
let app = new Vue({
  el: '#app',
  data: {
    id: '',
    position: 0,
    currentURL: '',
    number: '',
    addedName: '',
    addedComment: '',
    comments: {},
    ratings: {},
    current: {
      title: '',
      img: '',
      alt: ''
    },
    loading: true,
  },
  created() {
    this.xkcd();
  },

  computed: {
    poops() {
      return this.poops
    },
  },
  watch: {
    id(newId, oldId) {
      var first = "https://codepen.io/giaco/embed/"
      var half = "?height=765&amp;theme-id=0&amp;default-tab=js%2Cresult&amp;user=giaco&amp;slug-hash=apwMwM&amp;pen-title=Click%20and%20draw%20some%20flowers&amp;name=cp_embed_2"
      this.currentURL = first + newId + half
    },

    position(newPosition, oldPosition) {
      this.id = this.current[newPosition].id
    },
  },
  methods: {
    async xkcd() {
      try {
        this.loading = true;
        const response = await axios.get('https://cpv2api.com/pens/picks');
        console.log(response)
        //{ "name":"John", "age":30, "car":null }
        var personalFavorites = [{
          "id": "rHIsa"
        }, {
          "id": "KrAwx"
        }, {
          "id": "LkdOwj"
        }]
        this.current = personalFavorites.concat(response.data.data)
        //this.current = response.data.data;
        this.id = this.current[this.position].id
        this.loading = false;
        console.log(this.current)


      } catch (error) {
        this.number = this.max;
        console.log(error);
      }
    },
    previous() {
      this.position = this.position - 1
    },
    next() {
      this.position = this.position + 1
    },
    first() {
      this.position = 0;
    },
    last() {
      this.position = this.current.length;
    },
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    random() {
      this.position = this.getRandom(0, this.current.length);
    },

    addComment() {
      if (!(this.number in this.comments))

        Vue.set(app.comments, this.number, new Array);
      console.log();
      this.comments[this.number].push({
        author: this.addedName,
        time: moment().format('llll'),
        text: this.addedComment
      });
      this.addedName = '';
      this.addedComment = '';
    },
  },
});
