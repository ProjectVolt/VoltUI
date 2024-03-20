import { Background } from '@/components/login/Background';
import { Form } from '@/components/login/RegisterForm';
import { Header } from '@/components/login/Header';
import { Panel } from '@/components/login/Panel';

export default function RegisterPage() {
  return (
    <Background>
      <Panel>
        <Header />
        <Form />
      </Panel>
    </Background>
  );
}
