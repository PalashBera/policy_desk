import jwt from './jwt.helper';

export default {
  success(req, res, data, metaData) {
    const link = req.originalUrl;

    if (req.user) {
      const jwtToken = jwt.issue({ id: req.user.id }, '7d');
      metaData.jwtToken = jwtToken;
    };

    let resData = {
      data: data,
      requestLink: link,
      meta: metaData
    };

    if (Array.isArray(data)) resData.meta.totalCount = data.length;
    res.json(resData);
  },

  badRequest(res, error) {
    console.error('Bad Request', error);
    res.status(400).json(error);
  },

  unprocessableEntity(res, error) {
    console.error('Unprocessable Entity', error);
    res.status(422).json(error);
  },

  notAuthorized(res, error) {
    console.error('Unauthorized', error);
    return res.status(401).json(error);
  },

  forbidden(res, error) {
    console.error('Forbidden', error);
    res.status(403).json(error);
  },

  notFound(res, error) {
    console.error('Not Found', error);
    res.status(404).json(error);
  },

  internalServerError(res, error) {
    console.error('Internal Server Error', error);
    return res.status(500).json(error);
  },

  error(res, error) {
    console.log('Error Response: ', error.stack.split('\n'));
    return res.json({
      status: 'error',
      data: 'There was a problem with the request.'
    });
  }
}
