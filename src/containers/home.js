import React, {useEffect,useState} from 'react';
import styled from 'styled-components'


const  PageContainer = styled.div`
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    & > div:first-child{
        flex:0 0 30rem;
        border:1px solid black;
    }
    & > div:nth-child(2){
        flex:1;
        border:1px  dotted blue;
    }
    & > div:last-child{
        flex:2;
        border:2px solid red;
    }
`,
StyledDiv = styled.div`   

    padding:2rem 0;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;   


`,
ExampleDraggable = styled.div`
    background-color:pink;
    width:20rem;
    height:20rem;
`




const Home = () => {
    const [list,setState] = useState([])
    const onDrop = (e,num) => {
        e.preventDefault();
        console.log(num)
        const data = e.dataTransfer.getData("task")
        const newList = list.map(value => {
            if(value.text ===data){
                value.belongs = num
            }
            return value;
        })
        setState(newList)
    }
    const dragStart = (e,val) => {
        e.dataTransfer.setData("task", val.text)
    }
    const onDragOver = e => {
        e.preventDefault()
        console.log("drag over")
    }



    useEffect(() => {
        const list = [
            {
                text:"first",
                belongs:1
            },
            {
                text:"second",
                belongs:2
            },
            {
                text:"third",
                belongs:3
            }
        ]
        setState(list)
    },[])


    const renderDom = (domNumber) => {
        return list.reduce((acc,val,index) => {
            if(val.belongs === domNumber){
                const newVal = (
                    <ExampleDraggable key={index + val.text} draggable onDragStart={(e) => dragStart(e,val)}>{val.text}</ExampleDraggable>
                )
                acc.push(newVal)
            }
            return acc;
        },[])
    }

    return (
    <PageContainer>
        <StyledDiv onDrop={(e) => onDrop(e,1)} onDragOver={onDragOver}>
            {renderDom(1)}
        </StyledDiv>
        <StyledDiv onDrop={(e) => onDrop(e,2)} onDragOver={onDragOver}>
          {renderDom(2)}
        </StyledDiv>
        <StyledDiv onDrop={(e) => onDrop(e,3)} onDragOver={onDragOver}>
        {renderDom(3)}
        </StyledDiv>
    </PageContainer>
    )
}



export default Home