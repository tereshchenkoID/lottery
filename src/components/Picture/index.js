const IMAGE_TYPE = ['png', 'webp']

const Picture = ({ src, alt }) => {
  return (
    <picture>
      {
        IMAGE_TYPE.slice(1, IMAGE_TYPE.length).map((type, index) => (
          <source key={index} srcSet={`${src}.${type}`} />
        ))
      }
      <img 
        src={`${src}.${IMAGE_TYPE[0]}`} 
        alt={alt} 
      />
    </picture>
  )
}

export default Picture