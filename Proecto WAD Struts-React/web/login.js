const {
  Button, colors,createMuiTheme,CssBaseline,Dialog,DialogActions,DialogContent,DialogContentText,
  DialogTitle,Icon,MuiThemeProvider,Typography,Paper,withStyles,main,Avatar,FormControl,
  InputLabel,Input,FormControlLabel,form, Checkbox } = window['material-ui'];

const styles = theme => ({
    
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },  
});
class Index extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          nombre : "",
          mensaje : ""
      }
  }
  handleSubmit = event => {
      event.preventDefault;
      const data = this.state;
      console.log(data);   
  }
  
  handleInputChange = (event) => {
       event.preventDefault;
       this.setState({
           [event.target.name] : event.target.value
       });
  }
  render() {
      
    const { nombre,mensaje } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
            <Icon>sentiment_satisfied_alt</Icon>
        </Avatar>
        
        <Typography component="h1" variant="h5">
          Form con React y Material UI
        </Typography>
        <form action = "LoginAction" 
              method = "post" 
              className={classes.form} 
              onSubmit={this.handleSubmit}>
          <FormControl margin="mensaje" required fullWidth>
            <InputLabel htmlFor="mensaje">Mensaje</InputLabel>
            <Input id="mensaje" 
                   name="mensaje" 
                   autoComplete="mensaje" 
                   autoFocus value = {this.state.mensaje} 
                   onChange = {this.handleInputChange}/>
          </FormControl>
          <Button type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={event => this.handleSubmit(event)}>
                  Enviar
          </Button>
        </form>
      </Paper>
      </main>
    );
  }
}
const Inicio = withStyles(styles)(Index);
ReactDOM.render(<Inicio />, document.getElementById('root'));