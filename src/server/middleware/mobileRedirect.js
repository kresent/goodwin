import MobileDetect from 'mobile-detect';
import Format from '../../shared/utils/format';

export default function mobileRedirect(req, res, next) {
  const md = new MobileDetect(req.headers['user-agent']);

  const mobileDevice = md.mobile();
  const tabletDevice = md.tablet();

  const url = req.originalUrl;
  const mobileUrl = url.indexOf('mobile') !== -1;
  const tabletUrl = url.indexOf('tablet') !== -1;

  const productionPrefix = Format.productionPrefix();

  // if you're served a right url
  if (
    (tabletUrl && tabletDevice) ||
    (mobileUrl && mobileDevice) ||
    (!mobileUrl && !mobileDevice && !tabletUrl && !tabletDevice)
  ) {
    return next();
  }

  if (tabletDevice) {
    return next();
  }

  if (mobileDevice) {
    return res.redirect(
      301,
      `${productionPrefix}/mobile/map/${req.params.id ? req.params.id : ''}`
    );
  }

  res.redirect(
    301,
    `${productionPrefix}/map/${req.params.id ? req.params.id : ''}`
  );
}
