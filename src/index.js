import React from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import withStyles from 'react-jss';

export class ScrollShadowComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: false
    };

    this.ref = React.createRef();
  }

  resizeTags = () => {
    if (this.ref.current.clientHeight < this.ref.current.scrollHeight) {
      this.setState({ scroll: true });
    } else {
      this.setState({ scroll: false });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        className={`${classes.container} ${
          this.state.scroll ? classes.containerScroll : ''
        }`}
      >
        <div ref={this.ref} className={classes.subcontainer}>
          {this.props.children}
          <ReactResizeDetector handleHeight onResize={this.resizeTags} />
        </div>
      </div>
    );
  }
}

ScrollShadowComponent.propTypes = {
  scrollColor: PropTypes.string,
  scrollColorHover: PropTypes.string,
  scrollWidth: PropTypes.number
};

ScrollShadowComponent.defaultProps = {
  scrollColor: '#c5c5c5',
  scrollColorHover: '#a6a6a6',
  scrollWidth: 5,
  scrollPadding: 0
};

const styles = {
  containerScroll: {
    padding: props => props.scrollPadding,
    paddingRight: 0,
    boxSizing: 'border-box',
    boxShadow:
      '0 2px 4px rgba(0, 0, 0, 0.08) inset, 0 -2px 4px rgba(0, 0, 0, 0.08) inset'
  },
  container: {
    width: '100%',
    maxHeight: 'inherit',
    overflowY: 'hidden'
  },
  subcontainer: {
    overflowY: 'auto',
    maxHeight: 'inherit',
    '&::-webkit-scrollbar': {
      width: props => props.scrollWidth,
      background: 'transparent'
    },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': {
      background: props => props.scrollColor,
      borderRadius: 5,
      overflow: 'hidden',
      '&:hover': { background: props => props.scrollColorHover }
    }
  }
};

export default withStyles(styles)(ScrollShadowComponent);
