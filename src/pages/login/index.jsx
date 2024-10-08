import { MdEmail, MdLock, MdCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { Input } from "../../Components/Input";
import { api } from "../../service/api";

import avanade from "../../assets/avanade.png";
import aws from "../../assets/aws.png";
import pan from "../../assets/banco-pan.png";
import carrefour from "../../assets/carrefour.png";
import gtf from "../../assets/gft.png";
import ifood from "../../assets/ifood.png";
import inter from "../../assets/inter.png";
import microsoft from "../../assets/microsoft.png";
import ntt from "../../assets/ntt-data.png";
import philips from "../../assets/philips.png";
import santander from "../../assets/santander.png";
import vivo from "../../assets/vivo.png";

import {
  Container,
  Title,
  TitleLogin,
  SubtitleLogin,
  EsqueciText,
  CriarText,
  Wrapper,
  Column,
  Row,
  TextContent,
  CompanyContainer,
} from "./styles";

const schema = yup
  .object({
    email: yup.string().email("email n é valido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "No minino 8 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = async (FormData) => {
    try {
      const { data } = await api.get(
        `user?email${FormData.email}&senha=${FormData.password}`
      );
      if (data.length === 1) {
        navigate("/feed");
      } else {
        alert("Email ou senha incorretos.");
      }
    } catch {
      alert("Houve um erro!");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            Domine as tecnologias utilizadas pelas empresas mais inovadoras
          </Title>
          <TextContent>
            <MdCheck color="#22DD7A" /> +1.750 cursos, bootcamps, projetos e
            formações nas carreiras de back-end, front-end, mobile, games, data,
            inteligência artificial & cloud;
          </TextContent>
          <TextContent>
            <MdCheck color="#22DD7A" /> Conquiste certificados reconhecidos por
            grandes empresas de tecnologia em Java, Python, .NET, C#,
            JavaScript, Node.js, React, Angular, SQL, AWS, Azure, GCP, MongoDB,
            Kotlin, Swift entre mais de 500 tecnologias;
          </TextContent>
          <TextContent>
            <MdCheck color="#22DD7A" />
            +10.000 pessoas contratadas por grandes empresas no Brasil e
            exterior.
          </TextContent>
          <CompanyContainer>
            <div>
              <img src={ifood} alt="Ifood" />
              <img src={santander} alt="Santander" />
              <img src={inter} alt="Inter" />
              <img src={avanade} alt="Avanade" />
            </div>
            <div>
              <img src={carrefour} alt="Carrefour" />
              <img src={aws} alt="Aws" />
              <img src={ntt} alt="NTT data" />
              <img src={pan} alt="Banco pan" />
            </div>
            <div>
              <img src={gtf} alt="GTF" />
              <img src={philips} alt="Philips" />
              <img src={vivo} alt="Vivo" />
              <img src={microsoft} alt="Microsoft" />
            </div>
          </CompanyContainer>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Já tem cadastro?</TitleLogin>
            <SubtitleLogin>Faça seu login</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="email"
                errorMensage={errors.email?.message}
                control={control}
                placeholder="Email"
                leftIcon={<MdEmail color="#7F28B5"  size={20}/>}
              />
              <Input
                name="password"
                control={control}
                errorMensage={errors.password?.message}
                placeholder="Senha"
                type="password"
                leftIcon={<MdLock color="#7F28B5" size={20}/>}
              />
              <Button title="Entrar" variant="tertiary" type="submit" />
            </form>
            <Row>
              <EsqueciText href="#">Esqueci minha senha.</EsqueciText>
              <a href="#">Criar conta</a>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Login };
