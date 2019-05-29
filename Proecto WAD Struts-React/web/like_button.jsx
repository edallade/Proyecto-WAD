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


class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;
        return(
                <main className={classes.main}>
        <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        <center>
                            Welcome<br/>Missing Words & Sequencing
                        </center>
                    </Typography>
                    <form  action="Login" method="post" className={classes.form}>
                    <FormControl margin="name" required fullWidth>
                        <InputLabel htmlFor="name">Name</InputLabel> 
                        <Input  type="text" name="userName" autoComplete="name"/>
                    </FormControl>
                    <FormControl margin="password " required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel> 
                        <Input type="password" name="password"  />
                    </FormControl>    
                        
                        <Button type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Log in
          </Button>
                    </form>
                    </Paper>
                    <br/><br/>
                    <Typography component="h1" variant="h6">
                        <center>
                            Castillo Hernández, Lara Delgado, Soria Zúñiga
                        </center>
                    </Typography>
                </main>
                );
    }
}
const Inicio = withStyles(styles)(MyComponent);
ReactDOM.render(<Inicio />, document.getElementById('app'));