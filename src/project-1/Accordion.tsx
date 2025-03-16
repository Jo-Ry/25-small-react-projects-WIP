import ComponentWrapper from '../components/ComponentWrapper';
import AccordionWithDetailElements from './WithDetailElement';
import AccordionWithDivElements from './WithDivElement';

const Accordion = () => {
    return (
        <ComponentWrapper view="fill" className='accordions'>
            <AccordionWithDetailElements />
            <AccordionWithDivElements />
        </ComponentWrapper>
    );
};

export default Accordion;
