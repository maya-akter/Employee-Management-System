import PropTypes from 'prop-types';
import styled from 'styled-components';

const SummeryCard = ({ icon: Icon, text, number,color  }) => {
    console.log(color);
    
    return (
        <Wrapper className=' ' color={color}>
            <div className='summaryCard d-flex justify-content-between p-4'>
                <div className=''>
                    <p className='font_size'>{text}</p>
                    <p>{number}</p>
                </div>
                <div className='d-flex justify-content-center align-items-center px-2'>
                    <Icon className='icon'/>

                </div>
            </div>
        </Wrapper>
    );
};



SummeryCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    color: PropTypes.string, 
   
};



const Wrapper = styled.div`

background-color: ${({color})=>color};
p{
    color:white;
    font-size:22px;
}
.icon{
    font-size:30px;
    color:white;
}


`













export default SummeryCard;