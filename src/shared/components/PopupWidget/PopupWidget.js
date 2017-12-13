import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import styles from './PopupWidget.module.styl';

const getCustomStyle = modalRect => {
  if (typeof modalRect === 'undefined') return {};
  return {
    content: {
      top: `${modalRect.top}px`,
      left: `${modalRect.left}px`,
      right: `${modalRect.right}px`,
      bottom: `${modalRect.bottom}px`,
    },
  };
};

/**
 * Компонент-виджет отражает одни и те же дочерние
 * компоненты либо в контейнере, либо в модальном окне
 *
 * Обязательные свойства:
 ** height (number/string) - высота контейнера
 ** width (number/string) - ширина контейнера
 *
 * Необязательные свойства (без них модальное окно отражается на весь экран):
 ** modalHeight (number) - высота модалки
 ** modalWidth (number) - ширина модалки
 *
 * Дочерним комопнентам передаются:
 ** isModal (bool) - отражается в модальном окне
 ** handleClick (func) - обработчик открытия/закрытия окна
 *
 * @class PopupWidget
 * @extends {React.Component}
 */
class PopupWidget extends React.Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.isActive,
    });
  }

  calcModalCoordinates = layoutRect => {
    const { height, width, modalHeight, modalWidth } = this.props;

    const childWidth = isNaN(width) ? layoutRect.width : width;
    const childHeight = isNaN(height) ? layoutRect.height : height;

    const left = layoutRect.left + childWidth / 2 - modalWidth / 2;
    const top = layoutRect.top + childHeight / 2 - modalHeight / 2;

    return { left, top };
  };

  afterOpenModal = () => {
    const { modalHeight, modalWidth } = this.props;

    // если размеры модалки не в пикселях, показываем на полный экран
    if (isNaN(modalHeight) || isNaN(modalWidth))
      return this.setState({
        modalWrapperCoordinates: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      });

    const elementArray = document.getElementsByClassName(
      'apartment-details-map-modal'
    );
    const parentModal = elementArray.length > 0 ? elementArray[0] : null;
    if (!parentModal)
      throw new Error('Не найден элемент .apartment-details-map-modal');

    const rect = this.block.getBoundingClientRect();
    const modalCoordinates = this.calcModalCoordinates(rect);

    let scrollPos = parentModal.scrollTop;
    const oldScrollPos = scrollPos;
    const parentModalRect = parentModal.getBoundingClientRect();

    if (modalCoordinates.top + modalHeight > parentModalRect.bottom - 100) {
      // если раскрытый элемент ниже viewport
      scrollPos +=
        modalCoordinates.top + modalHeight - parentModalRect.bottom + 100;

      parentModal.scrollTop = scrollPos;
    } else if (modalCoordinates.top < parentModalRect.top) {
      // если раскрытый элемент выше viewport
      scrollPos += modalCoordinates.top - parentModalRect.top;

      parentModal.scrollTop = scrollPos;
    }

    this.setState({
      modalWrapperCoordinates: {
        top: modalCoordinates.top - (scrollPos - oldScrollPos),
        left: modalCoordinates.left,
      },
    });
  };

  toggleModal = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };

  renderChildren(children) {
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        isModal: this.state.isActive,
        handleClick: () => this.toggleModal(),
      })
    );
  }

  render() {
    const {
      height,
      width,
      modalHeight,
      modalWidth,
      children,
      className,
      isClickable,
    } = this.props;

    const updatedChildren = this.renderChildren(children);
    const modalChildren = this.renderChildren(children);

    return (
      <div>
        <div
          ref={block => (this.block = block)}
          className={className}
          onClick={isClickable ? this.toggleModal : null}
          style={{
            height,
            width,
          }}
        >
          {updatedChildren}
        </div>
        <Modal
          isOpen={this.state.isActive}
          contentLabel="PopupWidget"
          style={getCustomStyle(this.state.modalWrapperCoordinates)}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => this.setState({ isActive: false })}
          closeTimeoutMS={300}
          className={{
            base: styles.content,
            afterOpen: styles.contentAfterOpen,
            beforeClose: styles.contentBeforeClose,
          }}
          overlayClassName={{
            base: styles.overlay,
            afterOpen: styles.overlayAfterOpen,
            beforeClose: styles.overlayBeforeClose,
          }}
        >
          <div
            className={styles.wrapper}
            style={{
              height: modalHeight,
              width: modalWidth,
            }}
            onClick={isClickable ? this.toggleModal : null}
          >
            {modalChildren}
          </div>
        </Modal>
      </div>
    );
  }
}

export default PopupWidget;

PopupWidget.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  isClickable: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  modalHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modalWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PopupWidget.defaultProps = {
  isActive: false,
  isClickable: false,
  modalHeight: '100%',
  modalWidth: '100%',
};
