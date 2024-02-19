import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  Text,
  Paper,
  Group,
  Button,
  Stack,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import GoogleButton from 'react-google-button';
// import { useService } from '@/hooks/useService';
import AuthService from '@/services/auth.service';

const AuthenticationForm = () => {
    const { colors, defaultRadius } = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDarkTheme = colorScheme === 'dark';
    const authService = new AuthService();

    const onLoginClick = () => {
       authService.getGoogleLoginUrl();
    };

    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleToggle = () => {
        toggle();
        form.setFieldValue('terms', false);
    }

    // TODO: Apply border roundness to form based on theme
    return (
        <Paper radius="md" p="xl" withBorder shadow='md' m='xl'>
            <Stack align='center'>
                <Text size="lg" fw={500}>
                    Welcome to SeaTheMoss! 
                </Text>
                <Group gap='sm'>
                    <Text size='xl' fw={600} c={isDarkTheme ? colors.red[9] : colors.teal[9]}>
                        {type[0].toUpperCase() + type.slice(1)} 
                    </Text>
                    {/* <Text size="lg">
                        with your
                    </Text> */}
                </Group>
            </Stack>

            {/* <form onSubmit={form.onSubmit(() => {})}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            styles={{input: { height: '42px', fontSize: '18px' }}}
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        styles={{input: { height: '42px', fontSize: '18px' }}}
                        required
                        label="Email"
                        placeholder="your-email@google.com"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        styles={{input: { height: '42px', fontSize: '18px' }}}
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                    <Checkbox
                        label="I accept terms and conditions"
                        checked={form.values.terms}
                        onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                    />
                    )}
                </Stack>

                <Group className={submitButtonContainer} justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => handleToggle()} size="xs" mr='sm'>
                        {type === 'register' ? (
                            "Already have an account? Login"
                        ) : (
                            "Don't have an account? Register"
                        )}
                    </Anchor>
                    <Button type="submit" radius="xl" w='42%' px='md' h='fit-contnet'>
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>

            <Divider label="Or continue with provider" labelPosition="center" my="lg" /> */}

            <Group grow mb="md" mt="md">
                <Button type="dark" component={GoogleButton} px={0} onClick={onLoginClick} />
                {/* // TODO: Add Apple Auth */}
            </Group>
        </Paper>
    );
}

export default AuthenticationForm