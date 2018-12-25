import React, { Fragment, Component } from "react";

class TestComponent extends Component {
  static renderCount = 0;
  render() {
    TestComponent.renderCount = TestComponent.renderCount + 1;
    // console.log("TestComponent render", TestComponent.renderCount);
    return (
      <div ref={this.props.innerRef}>
        <p>
          mode <strong>{this.props.mode}</strong>
        </p>
      </div>
    );
  }
}

class Remote extends Component {
  static activeElement = null;
  // static renderCount = 0;

  static myRef = {
    desktop: "",
    mobile: "",
    tablet: ""
  };

  constructor(props) {
    super(props);

    const { classForMode } = props;

    if (classForMode) {
      Remote.myRef = Object.entries(classForMode).reduce(
        (prev, [mode, className]) => {
          prev[mode] = "";
          return prev;
        },
        {}
      );
    }
  }

  static UICopmponet = props => {
    const { mode } = props;

    if (!Remote.myRef[mode]) {
      Remote.myRef[mode] = React.createRef();
    }

    if (Remote.activeElement && Remote.myRef[mode] !== Remote.activeElement) {
      return null;
    }

    return <TestComponent innerRef={Remote.myRef[mode]} {...props} />;
  };

  componentDidMount() {
    let elements = Object.values(Remote.myRef);

    if (elements.length > 1) {
      let countVisibleElement = 0;
      elements.map(element => {
        if (
          element.current &&
          getComputedStyle(element.current.parentNode).display === "block"
        ) {
          Remote.activeElement = element;
          countVisibleElement++;
        }
      });

      if (countVisibleElement > 1) {
        console.error(
          "Элемент ввиден в нескольких режимах одновременно! Смотри prop[classForMode]"
        );
      } else if (countVisibleElement === 0) {
        console.error("Все элементы скрыты! Смотри prop[classForMode]");
      }
    } else {
      Remote.activeElement = elements[0];
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { classForMode } = this.props;
    // Remote.renderCount = Remote.renderCount + 1;
    // console.log("Remote render", Remote.renderCount);

    if (classForMode) {
      return (
        <Fragment>
          {Object.entries(classForMode).map(([mode, className]) => (
            <div key={mode} className={className}>
              <Remote.UICopmponet mode={mode} />
            </div>
          ))}
          <style jsx>{`
            @media only screen and (min-width: 900px) {
              .desktopClassName {
                display: block;
              }
              .tabletClassName {
                display: none;
              }
              .mobileClassName {
                display: none;
              }
            }

            @media only screen and (max-width: 900px) {
              .desktopClassName {
                display: none;
              }
              .tabletClassName {
                display: block;
              }
              .mobileClassName {
                display: none;
              }
            }

            @media only screen and (max-width: 600px) {
              .desktopClassName {
                display: none;
              }
              .tabletClassName {
                display: none;
              }
              .mobileClassName {
                display: block;
              }
            }
          `}</style>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

export default Remote;
