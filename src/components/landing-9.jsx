import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
const Landing_9 = () => {
  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.??",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.??",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.??",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.??",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.??",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    
  ];
  return (
    <div className="w-full bg-white h-fit py-12">
      <div className="w-4/6 h-fit m-auto gap-y-14 flex flex-col">
        <p className="text-5xl text-purple1 font-poppins font-bold  text-center">Frequently Asked Questions </p>
          <Accordion allowToggle defaultIndex={[]}>
              {faqs &&
                faqs.length > 0 &&
                faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    border="none"
                    _last={{ mb: "0" }}
                    mb={10}
                  >
                    <AccordionButton
                      bg="#E0FAEE"
                      border="none"
                      borderRadius="10px"
                      _expanded={{
                        bg: "#E0FAEE",
                        color: "black",
                        border: "none",
                      }}
                      _hover={{ bg: "#cbf5e2", border: "none" }}
                      py={2}
                      pr={"20px"}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="900"
                        px={"25px"}
                        py={"30px"}
                        fontSize="20px"
                      >
                        {faq.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} border="none" fontSize="18px">
                      {faq.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
            </Accordion>
      </div>

    </div>
  )
}

export default Landing_9